import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

export interface ControlCloneOptions<T extends AbstractControl = AbstractControl> {
  fallback?: (control: NonNullable<T>) => T;
  preserveValue?: boolean;
}

export function cloneAbstractControl<T extends AbstractControl>(
  control: NonNullable<T>,
  options?: ControlCloneOptions<T>
): T {
  let newControl: T;

  if (control instanceof FormGroup) {
    const formGroup = new FormGroup({}, control.validator, control.asyncValidator);
    const controls = control.controls;
    Object.keys(controls).forEach((key) => {
      formGroup.addControl(key, cloneAbstractControl(controls[key]));
    });
    newControl = formGroup as any;
  } else if (control instanceof FormArray) {
    const formArray = new FormArray([], control.validator, control.asyncValidator);
    control.controls.forEach((formControl) => formArray.push(cloneAbstractControl(formControl)));
    newControl = formArray as any;
  } else if (control instanceof FormControl) {
    const value = !options || options.preserveValue ? control.value : null;
    newControl = new FormControl(value, control.validator, control.asyncValidator) as any;
  } else if (options != null && typeof options.fallback === 'function') {
    return options.fallback(control);
  } else {
    throw new Error(`Unexpected form control implementation: ${control.constructor.name}`);
  }

  if (control.disabled) newControl.disable({ emitEvent: false });
  return newControl;
}
