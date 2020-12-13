import { ElementState } from './element-state';

export class ElementReadonlyState<T = any> extends ElementState<T> {
  className = 'read-only';
}
