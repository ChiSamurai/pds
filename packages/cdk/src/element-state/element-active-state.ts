import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Injectable, Input, Renderer2 } from '@angular/core';
import { ElementState } from './element-state';

@Injectable()
export class ElementActiveState<T = any> extends ElementState<T> {
  className = 'active';

  protected configure() {
    this.unsetOn('document:mouseup');
    this.setOn('mousedown');
  }
}

export interface ElementActiveAccessor<T = any> {
  readonly active: ElementActiveState<T>;
}

export function resolveElementActiveState(accessor: ElementActiveAccessor): ElementActiveState {
  return accessor.active;
}

@Directive({
  selector: '[active]',
  providers: [
    { provide: ElementActiveState, useFactory: resolveElementActiveState, deps: [ElementActiveAccessorDirective] },
  ],
})
export class ElementActiveAccessorDirective implements ElementActiveAccessor {
  @Input('active') set activeState(value: boolean) {
    this.active.set(coerceBooleanProperty(value));
  }

  readonly active = new ElementActiveState(this.elementRef, this.renderer);

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}
