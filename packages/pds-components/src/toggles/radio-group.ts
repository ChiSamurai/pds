import { AfterContentInit, ContentChildren, Directive, OnDestroy, QueryList } from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { mapTo, takeUntil } from 'rxjs/operators';
import { RadioBox } from './radio-box';

export function connectRadioBoxes(radioBoxes: RadioBox[]): Subscription {
  const anyCheck = merge(...radioBoxes.map(radio => radio.checks.pipe(mapTo(radio))));
  return anyCheck.subscribe(radio => {
    for (const radio1 of radioBoxes.filter(radio2 => radio2 !== radio)) {
      radio1.uncheck({ emitChange: false });
    }
  });
}

@Directive({ selector: '[radioGroup]' })
export class RadioGroup implements AfterContentInit, OnDestroy {

  private _subscription: Subscription;

  protected readonly ngDestroys = new Subject<void>();

  @ContentChildren(RadioBox, { descendants: true }) readonly radioBoxes: QueryList<RadioBox>;

  ngAfterContentInit(): void {
    this.invalidateConnection();
    this.radioBoxes.changes.pipe(takeUntil(this.ngDestroys))
      .subscribe(() => this.invalidateConnection());
  }

  ngOnDestroy(): void {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }

  invalidateConnection(radioBoxes?: RadioBox[]): void {
    if (this._subscription != null && !this._subscription.closed)
      this._subscription.unsubscribe();
    this._subscription = connectRadioBoxes(radioBoxes || this.radioBoxes.toArray());
  }

}
