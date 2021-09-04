import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Inject, Injectable, InjectionToken, Injector, Optional, TemplateRef, Type } from '@angular/core';
import { TOAST_CONTAINER, TOAST_CONTAINER_OFFSET, ToastContainer, ToastContainerOffset } from './toast-container';
import { ToastContext, ToastRef } from './toast-ref';

export type ToastPositionX = 'left' | 'center' | 'right';
export type ToastPositionY = 'top' | 'center' | 'bottom';

export type ToastPosition = [ToastPositionX, ToastPositionY];
export type ToastPositionString = `${ToastPositionX},${ToastPositionY}`;

export type BuiltInToastType = 'info' | 'success' | 'warning' | 'error';

/** Configurable options for the creation of a {@link ToastRef} */
export interface ToastOptions {
  injector?: Injector;
  type?: BuiltInToastType | string;
  position?: ToastPosition;
  duration?: number; // ms
  data?: any;
  component?: Type<unknown>;
}

export type ToastOptionsWithoutType = Omit<ToastOptions, 'type'>;

export const TOAST_COMPONENT = new InjectionToken<Type<unknown>>('TOAST_COMPONENT');

export const DEFAULT_TOAST_TYPE = new InjectionToken<BuiltInToastType | string>('DEFAULT_TOAST_TYPE', {
  providedIn: 'root',
  factory: () => 'info',
});
export const DEFAULT_TOAST_POSITION = new InjectionToken<ToastPosition>('DEFAULT_TOAST_POSITION', {
  providedIn: 'root',
  factory: () => ['center', 'bottom'],
});

@Injectable({ providedIn: 'root' })
export class Toaster {
  protected readonly overlays = new Map<ToastPositionString, OverlayRef>();
  protected readonly containerRefs = new Map<ToastPositionString, ComponentRef<ToastContainer>>();

  readonly typeDefs = new Map<string, TemplateRef<ToastContext>>();

  constructor(
    protected overlay: Overlay,
    protected injector: Injector,
    @Inject(TOAST_COMPONENT) protected componentType: Type<unknown>,
    @Inject(TOAST_CONTAINER) protected containerType: Type<ToastContainer>,
    @Inject(DEFAULT_TOAST_POSITION) readonly defaultPosition: ToastPosition,
    @Inject(DEFAULT_TOAST_TYPE) readonly defaultType: BuiltInToastType | string,
    @Optional() @Inject(TOAST_CONTAINER_OFFSET) protected containerOffsets?: ToastContainerOffset[]
  ) {}

  protected createOverlayConfig(position: ToastPosition): OverlayConfig {
    const [x, y] = position;
    const fnX: keyof GlobalPositionStrategy = x === 'center' ? 'centerHorizontally' : x;
    const fnY: keyof GlobalPositionStrategy = y === 'center' ? 'centerVertically' : y;
    const [offsetX, offsetY] =
      this.containerOffsets?.find((offset) => offset.position[0] === x && offset.position[1] === y)?.offset || [];
    const positionStrategy = this.overlay.position().global()[fnX](offsetX?.toString())[fnY](offsetY?.toString());

    return new OverlayConfig({
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy,
      maxHeight: '100vh',
      maxWidth: '100vw',
    });
  }

  protected resolveOrCreateOverlay(position: ToastPosition): OverlayRef {
    const positionStr = position.join() as ToastPositionString;

    let overlayRef = this.overlays.get(positionStr);
    if (overlayRef == null) {
      overlayRef = this.overlay.create(this.createOverlayConfig(position));
      this.overlays.set(positionStr, overlayRef);
    }
    return overlayRef;
  }
  protected resolveOrCreateContainer(position: ToastPosition): ToastContainer {
    const positionStr = position.join() as ToastPositionString;
    const overlayRef = this.resolveOrCreateOverlay(position);

    let containerRef = this.containerRefs.get(positionStr);
    if (containerRef == null) {
      containerRef = overlayRef.attach(new ComponentPortal(this.containerType));
      this.containerRefs.set(positionStr, containerRef);
    }
    return containerRef.instance;
  }

  push<R = unknown>(messageOrTemplateRef: string | TemplateRef<ToastContext>, options?: ToastOptions): ToastRef<R> {
    const type = options?.type || this.defaultType;

    let templateRef: TemplateRef<ToastContext> = this.typeDefs.get(type);
    let message: string;

    if (typeof messageOrTemplateRef === 'string') message = messageOrTemplateRef;
    else templateRef = messageOrTemplateRef;

    return new ToastRef(
      this.injector,
      this.resolveOrCreateContainer.bind(this),
      options?.component || this.componentType,
      type,
      options?.position || this.defaultPosition,
      templateRef,
      message,
      options?.data,
      options?.duration
    );
  }

  pushInfo<R = unknown>(
    messageOrTemplateRef: string | TemplateRef<ToastContext>,
    options?: ToastOptionsWithoutType
  ): ToastRef<R> {
    return this.push<R>(messageOrTemplateRef, { ...options, type: 'info' });
  }
  pushError<R = unknown>(
    messageOrTemplateRef: string | TemplateRef<ToastContext>,
    options?: ToastOptionsWithoutType
  ): ToastRef<R> {
    return this.push<R>(messageOrTemplateRef, { ...options, type: 'error' });
  }
  pushWarning<R = unknown>(
    messageOrTemplateRef: string | TemplateRef<ToastContext>,
    options?: ToastOptionsWithoutType
  ): ToastRef<R> {
    return this.push<R>(messageOrTemplateRef, { ...options, type: 'warning' });
  }
  pushSuccess<R = unknown>(
    messageOrTemplateRef: string | TemplateRef<ToastContext>,
    options?: ToastOptionsWithoutType
  ): ToastRef<R> {
    return this.push<R>(messageOrTemplateRef, { ...options, type: 'success' });
  }
}
