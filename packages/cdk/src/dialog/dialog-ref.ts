import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';
import { Observable, Subject, Subscriber, TeardownLogic } from 'rxjs';
import { DialogOverlayConfig } from './dialog-overlay';

export class DialogRef<R = any> extends Observable<R> {
  protected subject = new Subject<R>();

  constructor(readonly overlayRef: OverlayRef, readonly config?: DialogOverlayConfig) {
    super((subscriber) => this.subject.subscribe(subscriber));
  }

  dispose(result?: R): void {
    this.subject.next(result);
    this.subject.complete();
    this.overlayRef.dispose();
  }

  toSubject(): Subject<R> {
    return this.subject;
  }
}

export class ConnectedDialogRef<R = any, T = any> extends DialogRef<R> {
  private _componentRef: ComponentRef<T>;

  get componentRef(): ComponentRef<T> | null {
    return this._componentRef;
  }

  constructor(origin: DialogRef, protected portal: ComponentPortal<T>) {
    super(origin.overlayRef, origin.config);
    this.subject = origin.toSubject();
  }

  setProps(): void {
    // transfer input property values if there are any
    if (this.config?.props != null) {
      for (const [key, value] of Object.entries(this.config.props)) {
        // todo: consider a property validation using the component factory?!
        this._componentRef.instance[key] = value;
      }
    }
  }

  reattach(): ComponentRef<T> {
    if (!this.overlayRef.hasAttached()) {
      this._componentRef = this.overlayRef.attach(this.portal);
    }
    return this._componentRef;
  }
  detach(): any {
    this._componentRef = null;
    return this.overlayRef.detach();
  }

  _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    this._componentRef = this.overlayRef.attach(this.portal);
    return super._subscribe(subscriber);
  }
}
