import { ElementState } from './element-state';

export class ElementDisabledState<T = any> extends ElementState<T> {
  className = 'disabled';
}
