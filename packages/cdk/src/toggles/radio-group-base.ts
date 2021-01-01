import { AfterContentInit, ContentChildren, Directive, OnDestroy, QueryList } from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { mapTo, takeUntil } from 'rxjs/operators';
import { RadioBoxBase } from './radio-box-base';

export function connectRadioBoxes(radioBoxes: RadioBoxBase[]): Subscription {
  const anyCheck = merge(...radioBoxes.map((radio) => radio.checks.pipe(mapTo(radio))));
  return anyCheck.subscribe((radio) => {
    for (const radio1 of radioBoxes.filter((radio2) => radio2 !== radio)) {
      radio1.uncheck({ emitChange: false });
    }
  });
}

@Directive()
export class RadioGroupBase implements AfterContentInit, OnDestroy {
  private _subscription: Subscription;

  protected readonly ngDestroys = new Subject<void>();

  @ContentChildren(RadioBoxBase, { descendants: true }) readonly radioBoxes: QueryList<RadioBoxBase>;

  ngAfterContentInit(): void {
    this.invalidateConnection();
    this.radioBoxes.changes.pipe(takeUntil(this.ngDestroys)).subscribe(() => this.invalidateConnection());
  }

  ngOnDestroy(): void {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }

  invalidateConnection(radioBoxes?: RadioBoxBase[]): void {
    if (this._subscription != null && !this._subscription.closed) this._subscription.unsubscribe();
    this._subscription = connectRadioBoxes(radioBoxes || this.radioBoxes.toArray());
  }
}
