import { Injectable, NgModule, Provider } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { EventListener, EventManagerPlugin, EventUnlistener } from '../event-manager-plugin';

/**
 * Adds {@link AddEventListenerOptions} support to any event binding. Available
 * event listener options are "passive", "capture" and "once". They can be used
 * by simply adding the desired option name to the event binding like
 * `(click.once)="..."` or `(click.once.passive)="..."`. Chaining multiple
 * option names is provided out of the box
 */
@Injectable()
export class EventListenerOptionsPlugin extends EventManagerPlugin {
  supports(eventExpr: string): boolean {
    return /\.(capture|passive|once)/i.test(eventExpr);
  }

  addEventListener(element: Element, eventExpr: string, listener: EventListener): EventUnlistener {
    const ngZone = this.manager.getZone();
    const [eventName, ...listenerOptions] = (eventExpr && eventExpr.split('.')) || [];
    const listenerFn = (event) => ngZone.runGuarded(() => listener(event));
    ngZone.runOutsideAngular(() =>
      element.addEventListener(eventName, listenerFn, {
        capture: listenerOptions.includes('capture'),
        passive: listenerOptions.includes('passive'),
        once: listenerOptions.includes('once'),
      })
    );
    return () => element.removeEventListener(eventName, listenerFn);
  }
}

/**
 * Holds the necessary dependency information to provide the
 * {@link EventListenerOptionsPlugin} to any desired module context
 */
export const EVENT_LISTENER_OPTIONS_PLUGIN_PROVIDER: Provider = {
  provide: EVENT_MANAGER_PLUGINS,
  useClass: EventListenerOptionsPlugin,
  multi: true,
};

@NgModule({ providers: [EVENT_LISTENER_OPTIONS_PLUGIN_PROVIDER] })
export class EventListenerOptionsPluginModule {}
