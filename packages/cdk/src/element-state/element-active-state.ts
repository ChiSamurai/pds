import { ElementState } from './element-state';

export class ElementActiveState extends ElementState {

  className = 'active';

  protected configureEventListener() {
    this.unsetOn('document:mouseup');
    this.setOn('mousedown');
  }

}
