import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Injectable, Input, Renderer2 } from '@angular/core';
import { ElementState } from './element-state';

@Injectable()
export class ElementReadOnlyState<T = any> extends ElementState<T> {
  className = 'read-only';
}

export interface ElementReadOnlyAccessor<T = any> {
  readonly readOnly: ElementReadOnlyState<T>;
}

export function resolveElementReadOnlyState(accessor: ElementReadOnlyAccessor): ElementReadOnlyState {
  return accessor.readOnly;
}

@Directive({
  selector: '[readOnly]',
  providers: [
    {
      provide: ElementReadOnlyState,
      useFactory: resolveElementReadOnlyState,
      deps: [ElementReadonlyAccessorDirective],
    },
  ],
})
export class ElementReadonlyAccessorDirective implements ElementReadOnlyAccessor {
  @Input('readOnly') set readOnlyState(value: boolean) {
    this.readOnly.set(coerceBooleanProperty(value));
  }

  readonly readOnly = new ElementReadOnlyState(this.elementRef, this.renderer);

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}
