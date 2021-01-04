import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Injectable, Injector, Type } from '@angular/core';
import { take } from 'rxjs/operators';
import { ComponentProps } from '../utils';
import { DialogRef } from './dialog-ref';

/** Configurable options for the creation of a {@link DialogRef} */
export interface DialogOverlayConfig<C = any> {
  injector?: Injector;
  overlay?: OverlayConfig;
  disposeOnBackdropClick?: boolean;
  props?: ComponentProps<C>;
  fullscreen?: boolean;
}

@Injectable()
export class DialogOverlay {
  constructor(protected overlay: Overlay, protected injector: Injector) {}

  create<R = any, T = any>(componentType: Type<T>, config?: DialogOverlayConfig<T>): DialogRef<R, T> {
    const overlayRef = this.overlay.create(
      this.createOverlayConfig({
        injector: this.injector,
        ...config,
      })
    );
    const dialogRef = new DialogRef<R>(componentType, overlayRef, config);

    if (config && config.disposeOnBackdropClick) {
      overlayRef
        .backdropClick()
        .pipe(take(1))
        .subscribe(() => dialogRef.dispose());
    }

    return dialogRef;
  }

  createOverlayConfig(config: DialogOverlayConfig = {}): OverlayConfig {
    return new OverlayConfig({
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: config?.fullscreen
        ? this.overlay.position().global().top().left()
        : this.overlay.position().global().centerVertically().centerHorizontally(),
      height: config?.fullscreen ? '100vh' : null,
      width: config?.fullscreen ? '100vw' : null,
      hasBackdrop: true,

      ...config.overlay,
    });
  }
}
