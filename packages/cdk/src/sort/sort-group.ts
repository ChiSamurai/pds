import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortModel, SortModelChange, SortState } from './sort-model';
import { SortOrder } from './sort-order';
import { SortParamParser } from './sort-param-parser';

@Directive({
  exportAs: 'sortGroup',
  selector: '[sortGroup]',
  providers: [SortModel],
  inputs: [
    '_initValue: sortGroup',
    'emitInitChange: sortGroupEmitInitChange',
    'allowsMultiple: sortGroupAllowsMultiple',
    'preferredOrder: sortGroupPreferredOrder',
  ],
  outputs: ['changes: sortGroupChanges'],
})
export class SortGroup implements OnInit, OnDestroy {
  private _emitInitEvent = false;

  protected readonly ngDestroys = new Subject<void>();
  protected initValues: Array<SortState | string>;

  @Input()
  private set _initValue(value: Array<SortState | string> | SortState | string) {
    if (Array.isArray(value)) this.initValues = value;
    else if (value != null) this.initValues = [value];
  }

  @Input()
  set emitInitChange(value: boolean) {
    this._emitInitEvent = coerceBooleanProperty(value);
  }

  get emitInitChange(): boolean {
    return this._emitInitEvent;
  }

  @Input()
  set allowsMultiple(value: boolean) {
    this.model.allowsMultiple = coerceBooleanProperty(value);
  }

  get allowsMultiple(): boolean {
    return this.model.allowsMultiple;
  }

  @Input() preferredOrder: SortOrder = 'ascending';

  @Output() readonly changes = new EventEmitter<SortModelChange>();

  constructor(protected paramParser: SortParamParser, readonly model: SortModel) {
    model.changes.pipe(takeUntil(this.ngDestroys)).subscribe(this.changes);
  }

  ngOnInit(): void {
    if (this.initValues != null) {
      for (const stateOrParam of this.initValues) {
        const state = typeof stateOrParam === 'string' ? this.paramParser.parseParam(stateOrParam) : stateOrParam;
        this.model.set(state.key, state.order || this.preferredOrder, {
          emitChange: this._emitInitEvent,
        });
      }
    }
  }

  ngOnDestroy(): void {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
