import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Injectable, Injector, Type } from '@angular/core';
import { ComponentProps } from '../utils';
import { DialogRef } from './dialog-ref';

/** Configurable options for the creation of a {@link DialogRef} */
export interface DialogOverlayConfig<C = unknown> {
  injector?: Injector;
  overlay?: OverlayConfig;
  disposeOnBackdropClick?: boolean;
  props?: ComponentProps<C>;
}

@Injectable()
export class DialogOverlay {
  constructor(protected overlay: Overlay, protected injector: Injector) {}

  create<R = unknown, T = unknown>(componentType: Type<T>, config?: DialogOverlayConfig<T>): DialogRef<R, T> {
    const overlayRef = this.overlay.create(
      this.createOverlayConfig({
        injector: this.injector,
        ...config,
      })
    );
    return new DialogRef<R, T>(componentType, overlayRef, config);
  }

  createOverlayConfig(config: DialogOverlayConfig = {}): OverlayConfig {
    return new OverlayConfig({
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally(),
      maxHeight: '100vh',
      maxWidth: '100vw',
      hasBackdrop: true,

      ...config.overlay,
    });
  }
}
