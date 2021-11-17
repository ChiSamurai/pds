import { Injector, TemplateRef, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastContainer } from './toast-container';
import { BuiltInToastType, ToastPosition } from './toaster';

export interface ToastContext {
  $implicit: string;
  toast: ToastRef;
}

export class ToastRef<R = unknown> {
  private readonly _container: ToastContainer | null;
  private _durationTimeout: number;

  protected readonly subject = new Subject<R>();

  readonly injector: Injector;

  get container(): ToastContainer | null {
    return this._container;
  }

  constructor(
    injector: Injector,
    protected resolveOrCreateContainer: (position: ToastPosition) => ToastContainer,
    readonly componentType: Type<unknown>,
    readonly type: BuiltInToastType | string,
    readonly position: ToastPosition,
    readonly templateRef?: TemplateRef<ToastContext>,
    readonly message?: string,
    readonly data?: any,
    public duration?: number
  ) {
    this._container = this.resolveOrCreateContainer(this.position);
    this.injector = Injector.create({
      parent: injector,
      providers: [{ provide: ToastRef, useValue: this }],
    });
  }

  dispose(result?: R): void {
    const index = this._container?.queue.snapshot.indexOf(this);
    this._container?.queue.removeAt(index);

    this.subject.next(result);
    this.subject.complete();

    if (this._durationTimeout != null) clearTimeout(this._durationTimeout);
  }

  pop(duration?: number): Observable<R> {
    if (duration != null) this.duration = duration;

    this._container.queue.push(this);

    // todo(@janunld): inject a window reference to properly call `setTimeout` here without conflicting typings
    if (this.duration > 0) this._durationTimeout = window.setTimeout(() => this.dispose(), this.duration);

    return this.asObservable();
  }

  asObservable(): Observable<R> {
    return this.subject.asObservable();
  }
}
