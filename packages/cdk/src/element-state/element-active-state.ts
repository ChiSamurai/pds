import { Injectable } from '@angular/core';
import { ElementState } from './element-state';

@Injectable()
export class ElementActiveState<T = any> extends ElementState<T> {
  className = 'active';

  protected configure() {
    this.unsetOn('document:mouseup');
    this.setOn('mousedown');
  }
}
