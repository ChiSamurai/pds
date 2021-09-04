import { InjectionToken, Type } from '@angular/core';
import { ArrayBehaviorState } from '@vitagroup/common';
import { ToastRef } from './toast-ref';
import { ToastPosition } from './toaster';

export interface ToastContainer {
  queue: ArrayBehaviorState<ToastRef>;
}

export const TOAST_CONTAINER = new InjectionToken<Type<ToastContainer>>('TOAST_CONTAINER');

export interface ToastContainerOffset {
  position: ToastPosition;
  offset: [number | string, number | string];
}

export const TOAST_CONTAINER_OFFSET = new InjectionToken<ToastContainerOffset>('TOAST_CONTAINER_OFFSET');
