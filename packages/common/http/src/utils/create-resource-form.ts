import { Type } from '@angular/core';
import { AbstractControlOptions, FormArray, FormControl, FormGroup } from '@angular/forms';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Primitive } from '@vitagroup/common';
import 'reflect-metadata';
import { isResourceType } from '../decorator/resource';
import { RESOURCE_PROPERTY_METADATA, ResourcePropertyMetadata } from '../decorator/resource-property';

/** @experimental */
export interface ResourceFormControlOptions extends AbstractControlOptions {
  /**
   * Defines whether the {@link createResourceFormGroup} function will create a {@link FormGroup}, {@link FormArray}
   * or {@link FormControl} instance for the given resource property. Nested resource types will be created as a
   * `group`. Iterable resource properties will default to `array` unless overwritten. Any other type of resource
   * property will be created as a plain `control`.
   */
  as?: 'group' | 'array' | 'control';
  disabled?: boolean;
  value?: any;
}

/** @experimental */
export type CreateResourceFormControlOptions<T> = {
  [P in keyof T]?: T[P] extends Primitive | Date
    ? ResourceFormControlOptions
    : CreateResourceFormControlOptions<T[P]> | ResourceFormControlOptions;
};

/** @experimental */
export function createResourceFormGroup<T>(
  resourceType: Type<T>,
  controlOptions?: CreateResourceFormControlOptions<T>
): FormGroup {
  const properties: Map<PropertyKey, ResourcePropertyMetadata> = Reflect.getMetadata(
    RESOURCE_PROPERTY_METADATA,
    resourceType
  );
  const formGroup = new FormGroup({}, controlOptions);

  for (const [propertyKey, metadata] of properties) {
    const { as, value, disabled = false, ...opts } =
      (controlOptions?.[propertyKey] as ResourceFormControlOptions) || {};

    if (as === 'group' || isResourceType(metadata.type)) {
      const group = createResourceFormGroup(metadata.type, opts as any);
      formGroup.addControl(propertyKey.toString(), group);

      if (value) group.patchValue(value, { emitEvent: false });
      if (disabled) group.disable({ emitEvent: false });
    } else if (as === 'array' || metadata.iterable) {
      const array = Array.from(value).map((v) => createResourceFormGroup(metadata.type, { value: v, ...opts } as any));
      formGroup.addControl(propertyKey.toString(), new FormArray(array, opts));
    } else {
      formGroup.addControl(propertyKey.toString(), new FormControl({ value, disabled }, opts));
    }
  }

  return formGroup;
}
