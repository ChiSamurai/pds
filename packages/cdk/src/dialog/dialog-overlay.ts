import { Overlay, OverlayConfig, OverlayPositionBuilder, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, Type } from '@angular/core';
import { take } from 'rxjs/operators';
import { ComponentProps } from '../utils';
import { ConnectedDialogRef, DialogRef } from './dialog-ref';

/** Configurable options during the creation of a {@link DialogRef} */
export interface DialogOverlayConfig<C = any> {
  injector?: Injector;
  overlay?: OverlayConfig;
  disposeOnBackdropClick?: boolean;
  props?: ComponentProps<C>;
}

@Injectable()
export class DialogOverlay {
  /** See {@link Overlay.scrollStrategies} */
  get scrollStrategies(): ScrollStrategyOptions {
    return this.overlay.scrollStrategies;
  }

  constructor(protected overlay: Overlay, protected injector: Injector) {}

  /** See {@link Overlay.position} */
  position(): OverlayPositionBuilder {
    return this.overlay.position();
  }

  create<R = any, T = any>(componentType: Type<T>, config?: DialogOverlayConfig<T>): ConnectedDialogRef<R, T> {
    const overlayRef = this.overlay.create(this.createOverlayConfig(config || {}));
    const dialogRef = new DialogRef<R>(overlayRef, config);

    if (config && config.disposeOnBackdropClick) {
      overlayRef
        .backdropClick()
        .pipe(take(1))
        .subscribe(() => dialogRef.dispose());
    }

    const portal = new ComponentPortal(componentType, null, this.createInjector(dialogRef, config?.injector));
    return new ConnectedDialogRef(dialogRef, portal);
  }

  createOverlayConfig(config: DialogOverlayConfig = {}): OverlayConfig {
    return new OverlayConfig({
      scrollStrategy: this.scrollStrategies.block(),
      hasBackdrop: true,

      ...config.overlay,
    });
  }
  createInjector(dialogRef: DialogRef, parent?: Injector): Injector {
    // we definitely want to force a "default" parent injector even when "null" is given!
    parent = parent || this.injector;
    return Injector.create({
      parent,
      providers: [{ provide: DialogRef, useValue: dialogRef }],
    });
  }
}
