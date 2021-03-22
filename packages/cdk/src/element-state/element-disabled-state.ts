import { Injectable } from '@angular/core';
import { ElementState } from './element-state';

@Injectable()
export class ElementDisabledState<T = any> extends ElementState<T> {
  className = 'disabled';
}
