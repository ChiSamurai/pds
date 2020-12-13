import { ElementState } from './element-state';
import { ElementStateFilters } from './element-state-filter';
import targetOutsideOf = ElementStateFilters.targetOutsideOf;

export class ElementFocusState extends ElementState {

  className = 'focus';

  protected configureEventListener() {
    this.unsetOn('document:mousedown', e => targetOutsideOf(this.nativeElement)(e) && this.isSet);
    this.setOn('mousedown');
  }

}
