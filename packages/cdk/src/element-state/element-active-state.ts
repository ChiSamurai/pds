import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Injectable, Input, Renderer2 } from '@angular/core';
import { ElementFocusState } from './element-focus-state';
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
  selector: '[active], [activated]',
  inputs: ['_active: active', '_active: activated'],
  providers: [
    { provide: ElementActiveState, useFactory: resolveElementActiveState, deps: [ElementActiveAccessorDirective] },
  ],
})
export class ElementActiveAccessorDirective implements ElementActiveAccessor {
  private set _active(value: boolean) {
    this.active.set(coerceBooleanProperty(value));
  }

  readonly active = new ElementActiveState(this.elementRef, this.renderer);

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}
