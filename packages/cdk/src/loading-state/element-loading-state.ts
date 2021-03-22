import { Directive, ElementRef, Inject, Optional, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { ElementState } from '../element-state/element-state';
import { LoadingState } from './loading-state';

@Directive({ selector: '[loadingState]' })
export class ElementLoadingState extends ElementState {
  private _subs: Subscription[] = [];

  className = 'loading';

  get connected(): boolean {
    return this._subs.length > 0;
  }

  get disconnected(): boolean {
    return !this.connected;
  }

  constructor(
    @Inject(ElementRef) elementRef: ElementRef | any,
    @Inject(Renderer2) renderer: Renderer2,
    @Optional() state?: LoadingState
  ) {
    super(elementRef, renderer);
    if (state != null) this.connect(state);
  }

  connect(state: LoadingState): this {
    this._subs.push(
      state.starts.subscribe(() => this.set()),
      state.stops.subscribe(() => this.unset())
    );
    return this;
  }
  disconnect(): void {
    for (const sub of this._subs) {
      if (sub != null && !sub.closed) sub.unsubscribe();
    }
    // reset the subscription array
    this._subs = [];
  }

  dispose() {
    this.disconnect();
    super.dispose();
  }
}
