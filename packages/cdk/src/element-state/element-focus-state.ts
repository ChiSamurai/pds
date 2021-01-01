import { ElementState } from './element-state';

// todo(@janunld): consider a platform independent token for this check?!
function targetOutsideElement(target: any, element: any): boolean {
  return !(element as Node).contains(target as Node);
}

export class ElementFocusState<T = any> extends ElementState<T> {
  className = 'focus';

  protected configureEventListener() {
    this.unsetOn('document:mousedown', (e) => this.isSet && targetOutsideElement(e.target, this.nativeElement));
    this.setOn('mousedown');
  }
}
