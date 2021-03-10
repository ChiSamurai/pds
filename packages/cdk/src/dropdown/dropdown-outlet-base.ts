import { ConnectedPosition, OverlayConfig } from '@angular/cdk/overlay';
import { Directive, OnInit } from '@angular/core';
import { OverlayOutletBase } from '../overlay/overlay-outlet-base';
import { DropdownDefBase, DropdownPosition, DropdownPositionX, DropdownPositionY } from './dropdown-def-base';

const top: Partial<ConnectedPosition> = { originY: 'top', overlayY: 'bottom' };
const bottom: Partial<ConnectedPosition> = { originY: 'bottom', overlayY: 'top' };
const start: Partial<ConnectedPosition> = { originX: 'start', overlayX: 'start' };
const end: Partial<ConnectedPosition> = { originX: 'end', overlayX: 'end' };

export const DROPDOWN_POSITIONS: Record<DropdownPositionY, Record<DropdownPositionX, ConnectedPosition>> = {
  bottom: {
    start: { ...bottom, ...start } as ConnectedPosition,
    end: { ...bottom, ...end } as ConnectedPosition,
  },
  top: {
    start: { ...top, ...start } as ConnectedPosition,
    end: { ...top, ...end } as ConnectedPosition,
  },
};

@Directive()
export abstract class DropdownOutletBase extends OverlayOutletBase<DropdownDefBase> implements OnInit {
  deactivateOnBlur = true;

  protected updatePreferredPosition(): void {
    const [preferredX, preferredY] = this.overlayDef.preferredPosition;
    const preferredPosition = DROPDOWN_POSITIONS[preferredY][preferredX];
    const positions = [
      ['start', 'bottom'],
      ['start', 'top'],
      ['end', 'bottom'],
      ['end', 'top'],
    ].filter(([x, y]) => x != preferredX && y != preferredY) as DropdownPosition[];
    const connectedPositions = [preferredPosition, ...positions.map(([x, y]) => DROPDOWN_POSITIONS[y][x])];

    this.overlayRef.updatePositionStrategy(
      this.overlay.position().flexibleConnectedTo(this.viewContainerRef.element).withPositions(connectedPositions)
    );
  }

  activate() {
    this.updatePreferredPosition();
    super.activate();
  }
  toggle(): void {
    if (this.isActive) this.deactivate();
    else this.activate();
  }

  ngOnInit() {
    super.ngOnInit();

    this.listenUntilDestroyed(this.viewContainerRef.element, 'click', () => this.toggle());
  }
}
