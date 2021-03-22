import { Injectable } from '@angular/core';
import { ElementState } from './element-state';

@Injectable()
export class ElementReadOnlyState<T = any> extends ElementState<T> {
  className = 'read-only';
}
