import { Directive } from '@angular/core';
import { OverlayDefBase } from '../overlay/overlay-def-base';

export type DropdownPositionY = 'top' | 'bottom';
export type DropdownPositionX = 'start' | 'end';

export type DropdownPosition = [DropdownPositionX, DropdownPositionY];

@Directive()
export abstract class DropdownDefBase extends OverlayDefBase {
  preferredPosition: DropdownPosition = ['start', 'bottom'];
}
