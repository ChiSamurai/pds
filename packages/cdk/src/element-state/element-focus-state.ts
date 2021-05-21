import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, ElementRef, Injectable, Input, Renderer2 } from '@angular/core';
import { ElementState } from './element-state';

// todo(@janunld): consider a platform independent token for this check?!
function targetInside(target: any, element: any): boolean {
  return (element as Node).contains(target as Node);
}

@Injectable()
export class ElementFocusState<T = any> extends ElementState<T> {
  /** Gets the ancestors whitelist that ignore unsets if they appear as target of the document:mousedown unset event */
  readonly ancestors = new Set<any>();

  className = 'focus';

  protected configure() {
    this.setOn('focus');
    this.setOn('mousedown');

    this.unsetOn('blur', (e: FocusEvent) => this.canUnset(e.relatedTarget));
    this.unsetOn('document:mousedown', (e) => this.canUnset(e.target));
  }

  canUnset(target: any) {
    const insideAncestor =
      this.ancestors.size && Array.from(this.ancestors).some((ancestor) => targetInside(target, ancestor));
    return this.isSet && !targetInside(target, this.nativeElement) && !insideAncestor;
  }

  set(value = true) {
    if (this.isUnset && value) (this.nativeElement as any).focus?.();
    super.set(value);
  }
}

export interface ElementFocusAccessor<T = any> {
  readonly focus: ElementFocusState<T>;
}

export function resolveElementFocusState(accessor: ElementFocusAccessor): ElementFocusState {
  return accessor.focus;
}

@Directive({
  selector: '[tabindex]',
  providers: [
    { provide: ElementFocusState, useFactory: resolveElementFocusState, deps: [ElementFocusAccessorDirective] },
  ],
})
export class ElementFocusAccessorDirective implements ElementFocusAccessor {
  readonly focus = new ElementFocusState(this.elementRef, this.renderer);

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}
