import { ElementState } from './element-state';

export class ElementReadOnlyState<T = any> extends ElementState<T> {
  className = 'read-only';
}
