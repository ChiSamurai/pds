import { ElementState } from './element-state';

export class ElementActiveState<T = any> extends ElementState<T> {
  className = 'active';

  protected configureEventListener() {
    this.unsetOn('document:mouseup');
    this.setOn('mousedown');
  }
}
