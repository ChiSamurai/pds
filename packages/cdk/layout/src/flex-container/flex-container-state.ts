/** Describes mainly CSS values that are set to any fx-container element */
import { InjectionToken } from '@angular/core';

export interface FlexContainerState {
  /** Sets the max-width value for the container {@link ElementRef} */
  maxWidth?: string | number;
  /** Sets the padding value for the container {@link ElementRef} */
  padding?: string | number;
}

/**
 * Describes a conditional flex container state that's activated whenever the
 * desired {@link breakpoint}s are hit
 */
export interface MediaFlexContainerState extends FlexContainerState {
  breakpoint: string[] | string;
}

export const MEDIA_FLEX_CONTAINER_STATES
  = new InjectionToken<MediaFlexContainerState[]>('MEDIA_FLEX_CONTAINER_STATES');

export const FLEX_CONTAINER_STATE
  = new InjectionToken<FlexContainerState>('FLEX_CONTAINER_STATE');
