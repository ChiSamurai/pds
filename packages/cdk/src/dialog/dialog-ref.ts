import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injector, Type } from '@angular/core';
import { Observable, Subject, Subscriber, TeardownLogic } from 'rxjs';
import { take } from 'rxjs/operators';
import { ComponentProps } from '../utils/component-props';
import { DialogOverlayConfig } from './dialog-overlay';

export class DialogRef<R = unknown, T = unknown> extends Observable<R> {
  private _componentRef: ComponentRef<T>;

  protected readonly subject = new Subject<R>();
  protected readonly injector = Injector.create({
    parent: this.config?.injector,
    providers: [{ provide: DialogRef, useValue: this }],
  });

  get componentRef(): ComponentRef<T> | null {
    return this._componentRef;
  }

  constructor(
    readonly componentType: Type<any>,
    readonly overlayRef: OverlayRef,
    readonly config: DialogOverlayConfig<T>
  ) {
    super((subscriber) => this.subject.subscribe(subscriber));

    if (config && config.disposeOnBackdropClick) {
      overlayRef
        .backdropClick()
        .pipe(take(1))
        .subscribe(() => this.dispose());
    }
  }

  dispose(result?: R): void {
    this.subject.next(result);
    this.subject.complete();
    this.overlayRef.dispose();
  }

  setProps(props: ComponentProps<T> = this.config?.props): void {
    // transfer input property values if there are any
    for (const [key, value] of Object.entries(props)) {
      // consider a property validation using the component factory?!
      this._componentRef.instance[key] = value;
    }
  }

  reattach(): ComponentRef<T> {
    if (!this.overlayRef.hasAttached()) {
      this._componentRef = this.overlayRef.attach(new ComponentPortal(this.componentType, null, this.injector));
    }
    return this._componentRef;
  }
  detach(): any {
    this._componentRef = null;
    return this.overlayRef.detach();
  }

  _subscribe(subscriber: Subscriber<R>): TeardownLogic {
    this.reattach();
    this.setProps();

    return super._subscribe(subscriber);
  }
}
