import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { EventUnlistener } from '@vitagroup/common';
import { SelectionValue } from '../selection/selection-value';

@Directive()
export abstract class SelectOptionBase<T, E = any> extends SelectionValue<T> implements OnInit, OnDestroy {
  private _unlistenClick: EventUnlistener;

  @Input() value: T;

  get nativeElement(): E {
    return this.elementRef.nativeElement;
  }

  ngOnInit() {
    this._unlistenClick = this.renderer.listen(this.elementRef.nativeElement, 'click', (e) => {
      e.preventDefault();
      this.toggle();
    });
  }
  ngOnDestroy() {
    this._unlistenClick();
  }
}
