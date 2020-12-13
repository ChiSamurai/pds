import { EventManager } from '@angular/platform-browser';

export type EventListener<T = any> = (event: Event) => T;
export type EventUnlistener = () => void;

export abstract class EventManagerPlugin {
  /**
   * Gets the {@link EventManager} for the current {@link EventManagerPlugin}
   * instance
   */
  readonly manager: EventManager;

  /**
   * Evaluates whether a given event name, including custom angular appendix, is
   * supported by the {@link EventManagerPlugin} instance
   */
  abstract supports(eventName: string): boolean;

  /**
   * Attaches an event listener function to the event defined by the event name
   * parameter for the given target element. This function should return an
   * event "unlisten" function
   */
  abstract addEventListener(
    element: Element,
    eventName: string,
    listener: EventListener
  ): EventUnlistener;
}
