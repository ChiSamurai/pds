import { Directive } from '@angular/core';
import { OverlayDefBase } from '../overlay/overlay-def-base';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

@Directive()
export class TooltipDefBase extends OverlayDefBase {
  preferredPosition: TooltipPosition;
}
