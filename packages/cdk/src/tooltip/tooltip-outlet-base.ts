import { ConnectedPosition } from '@angular/cdk/overlay';
import { Directive, OnInit } from '@angular/core';
import { OverlayOutletBase } from '../overlay/overlay-outlet-base';
import { TooltipDefBase, TooltipPosition } from './tooltip-def-base';

export const TOOLTIP_POSITIONS: Record<TooltipPosition, ConnectedPosition> = {
  top: {
    originX: 'center',
    overlayX: 'center',
    originY: 'top',
    overlayY: 'bottom',
    panelClass: 'top',
  },
  bottom: {
    originX: 'center',
    overlayX: 'center',
    originY: 'bottom',
    overlayY: 'top',
    panelClass: 'bottom',
  },
  left: {
    originX: 'start',
    overlayX: 'end',
    originY: 'center',
    overlayY: 'center',
    panelClass: 'left',
  },
  right: {
    originX: 'end',
    overlayX: 'start',
    originY: 'center',
    overlayY: 'center',
    panelClass: 'right',
  },
};

@Directive()
export abstract class TooltipOutletBase extends OverlayOutletBase<TooltipDefBase> implements OnInit {
  preferredPosition: TooltipPosition;

  protected updatePreferredPosition(): void {
    const preferredPosition = this.preferredPosition || this.overlayDef.preferredPosition;
    const positionsInOrder = Object.keys(TOOLTIP_POSITIONS).sort((position) =>
      position !== preferredPosition ? 0 : -1
    ) as TooltipPosition[];
    const connectedPositions = positionsInOrder.map((position) => TOOLTIP_POSITIONS[position]);

    this.overlayRef.updatePositionStrategy(
      this.overlay.position().flexibleConnectedTo(this.viewContainerRef.element).withPositions(connectedPositions)
    );
  }

  activate() {
    this.updatePreferredPosition();
    super.activate();
  }
  toggle() {
    if (this.isActive) this.deactivate();
    else this.activate();
  }

  ngOnInit() {
    super.ngOnInit();

    this.deactivateOnBlur = true;

    this.shortcuts.register('enter', () => this.toggle());

    this.listenUntilDestroyed(this.viewContainerRef.element, 'mouseenter', () => this.activate());
    this.listenUntilDestroyed(this.viewContainerRef.element, 'mouseleave', () => this.deactivate());
    this.listenUntilDestroyed('document', 'mouseleave', () => this.deactivate());
  }
}
