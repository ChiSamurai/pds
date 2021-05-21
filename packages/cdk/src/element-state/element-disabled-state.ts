import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Injectable, Input, Renderer2 } from '@angular/core';
import { ElementState } from './element-state';

@Injectable()
export class ElementDisabledState<T = any> extends ElementState<T> {
  className = 'disabled';
}

export interface ElementDisabledAccessor<T = any> {
  readonly disabled: ElementDisabledState<T>;
}

export function resolveElementDisabledState(accessor: ElementDisabledAccessor): ElementDisabledState {
  return accessor.disabled;
}

@Directive({
  selector: '[disabled]',
  providers: [
    {
      provide: ElementDisabledState,
      useFactory: resolveElementDisabledState,
      deps: [ElementDisabledAccessorDirective],
    },
  ],
})
export class ElementDisabledAccessorDirective implements ElementDisabledAccessor {
  @Input('disabled') private set _disabled(value: boolean) {
    this.disabled.set(coerceBooleanProperty(value));
  }

  readonly disabled = new ElementDisabledState(this.elementRef, this.renderer);

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}
