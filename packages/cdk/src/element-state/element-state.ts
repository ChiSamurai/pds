import { ElementRef, Predicate, Renderer2 } from '@angular/core';
import { EventUnlistener, PrimitiveBehaviorState } from '@vitagroup/common';
import { Observable } from 'rxjs';

export abstract class ElementState<T = any> {
  private _unlistener: EventUnlistener[] = [];

  protected readonly state = new PrimitiveBehaviorState<boolean>(false);

  /** Gets os sets the class name that's applied and removed to the {@link nativeElement} */
  abstract className: string;

  /** Gets whether the state has a valid class name or not */
  get hasClassName(): boolean {
    return this.className != null && this.className.trim() !== '';
  }

  get isSet(): boolean {
    return this.state.snapshot;
  }
  get isUnset(): boolean {
    return !this.state.snapshot;
  }

  /** Gets the native element the state is attached to */
  readonly nativeElement: T;

  /**
   * @param element  Gets the {@link ElementRef}
   * @param renderer Gets the {@link Renderer2} of the element state instance
   */
  constructor(element: ElementRef<T> | T, protected renderer: Renderer2) {
    this.nativeElement = element instanceof ElementRef ? element.nativeElement : element;
    if (this.configureEventListener != null) this.configureEventListener();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected configureEventListener(): void {}

  set(): void {
    if (this.hasClassName) this.renderer.addClass(this.nativeElement, this.className);
    if (this.isUnset) this.state.patch(true);
  }
  unset(): void {
    if (this.hasClassName) this.renderer.removeClass(this.nativeElement, this.className);
    if (this.isSet) this.state.patch(false);
  }

  toggle(): void {
    if (this.isUnset) this.set();
    else this.unset();
  }

  dispose(): void {
    this.unlistenAll();
  }

  asObservable(): Observable<boolean> {
    return this.state.asObservable();
  }

  protected setOn(eventName: string, filter?: Predicate<any>): EventUnlistener {
    return this.listen(eventName, (e) => {
      if (filter == null || filter(e)) this.set();
    });
  }
  protected unsetOn(eventName: string, filter?: Predicate<any>): EventUnlistener {
    return this.listen(eventName, (e) => {
      if (filter == null || filter(e)) this.unset();
    });
  }

  protected listen(eventName: string, listener: EventListener): EventUnlistener {
    let target: T | string = this.nativeElement;
    if (eventName.includes(':')) {
      const [globalTarget, actualEventName] = eventName.split(':');
      eventName = actualEventName;
      target = globalTarget;
    }
    const unlistener = this.renderer.listen(target, eventName, listener);
    this._unlistener.push(unlistener);
    return unlistener;
  }
  protected unlistenAll(): void {
    for (const unlisten of this._unlistener) unlisten();
    this._unlistener = [];
  }
}
