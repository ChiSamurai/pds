import { ConnectedPosition } from '@angular/cdk/overlay';
import { Directive, OnInit } from '@angular/core';
import { EventUnlistener } from '@vitagroup/common';
import { OverlayOutletBase } from '../overlay/overlay-outlet-base';
import {
  DropdownDefBase,
  DropdownPosition,
  DropdownPositionString,
  DropdownPositionX,
  DropdownPositionY,
  parseDropdownPosition,
} from './dropdown-def-base';

const top: Partial<ConnectedPosition> = { originY: 'top', overlayY: 'bottom' };
const bottom: Partial<ConnectedPosition> = { originY: 'bottom', overlayY: 'top' };
const left: Partial<ConnectedPosition> = { originX: 'start', overlayX: 'start' };
const right: Partial<ConnectedPosition> = { originX: 'end', overlayX: 'end' };

export const DROPDOWN_POSITIONS: Record<DropdownPositionY, Record<DropdownPositionX, ConnectedPosition>> = {
  bottom: {
    left: { ...bottom, ...left } as ConnectedPosition,
    right: { ...bottom, ...right } as ConnectedPosition,
  },
  top: {
    left: { ...top, ...left } as ConnectedPosition,
    right: { ...top, ...right } as ConnectedPosition,
  },
};

@Directive()
export abstract class DropdownOutletBase extends OverlayOutletBase<DropdownDefBase> implements OnInit {
  private _preferredPosition: DropdownPosition;
  private _unlistenEnterKeyUp: EventUnlistener;
  private _unlistenMouseUp: EventUnlistener;

  set preferredPosition(value: DropdownPosition | DropdownPositionString) {
    this._preferredPosition = typeof value === 'string' ? parseDropdownPosition(value) : value;
  }
  get preferredPosition(): DropdownPosition | DropdownPositionString {
    return this._preferredPosition;
  }

  protected updatePreferredPosition(): void {
    const [preferredX, preferredY] = this.preferredPosition || this.overlayDef.preferredPosition;
    const preferredPosition = DROPDOWN_POSITIONS[preferredY][preferredX];
    const positions = [
      ['left', 'bottom'],
      ['left', 'top'],
      ['right', 'bottom'],
      ['right', 'top'],
    ].filter(([x, y]) => x != preferredX && y != preferredY) as DropdownPosition[];
    const connectedPositions = [preferredPosition, ...positions.map(([x, y]) => DROPDOWN_POSITIONS[y][x])];

    this.overlayRef.updatePositionStrategy(
      this.overlay.position().flexibleConnectedTo(this.viewContainerRef.element).withPositions(connectedPositions)
    );
  }

  protected preventDefaultDeactivation(): void {
    this._unlistenEnterKeyUp();
    this._unlistenMouseUp();
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

    this.deactivateOnBlur = true;

    this.shortcuts.register('enter', () => this.toggle());

    this.listenUntilDestroyed(this.viewContainerRef.element, 'click', () => this.toggle());

    this._unlistenMouseUp = this.listenUntilDestroyed(this.overlayRef.overlayElement, 'mouseup', () =>
      this.deactivate({ setFocus: true })
    );
    this._unlistenEnterKeyUp = this.listenUntilDestroyed(this.overlayRef.overlayElement, 'keyup.enter', () =>
      this.deactivate({ setFocus: true })
    );
  }
}
