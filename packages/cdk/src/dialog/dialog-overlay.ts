import { Overlay, OverlayConfig, OverlayPositionBuilder, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';
import { take } from 'rxjs/operators';
import { ConnectedDialogRef, DialogRef } from './dialog-ref';

/** Describes available options for the creation of dialog overlays */
export interface DialogConfig<C = any> {
  disposeOnBackdropClick?: boolean;
  overlay?: OverlayConfig;
  closable?: boolean;
  props?: {
    [P in keyof C]?: C[P] extends Function ? never : C[P];
  };
}

@Injectable()
export class DialogOverlay {
  get scrollStrategies(): ScrollStrategyOptions {
    return this.overlay.scrollStrategies;
  }

  constructor(protected overlay: Overlay, protected injector: Injector) {
  }

  position(): OverlayPositionBuilder {
    return this.overlay.position();
  }

  create<R = any, T = any>(componentType: Type<T>, config?: DialogConfig<T>): ConnectedDialogRef<R, T> {
    const overlayRef = this.overlay.create(this.createOverlayConfig(config || {}));
    const dialogRef = new DialogRef<R>(overlayRef, config);

    if (config && config.disposeOnBackdropClick) {
      overlayRef.backdropClick().pipe(take(1))
        .subscribe(() => dialogRef.dispose());
    }

    const portal = new ComponentPortal(componentType, null, this.createInjector(dialogRef));
    return new ConnectedDialogRef(dialogRef, portal);
  }

  createInjector(dialogRef: DialogRef): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [ { provide: DialogRef, useValue: dialogRef } ]
    });
  }

  createOverlayConfig(config: DialogConfig = {}): OverlayConfig {
    return new OverlayConfig({
      scrollStrategy: this.scrollStrategies.block(),
      hasBackdrop: true,

      ...config.overlay
    });
  }
}
