import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Directive, EventEmitter, InjectionToken, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PrimitiveTrackByFn, SelectionChange, SelectionModel, SelectOptions } from './selection-model';

@Directive({
  exportAs: 'selectionControl',
  selector: '[selectionControl]',
  providers: [{ provide: SelectionModel, useExisting: SelectionControl }],
  inputs: ['model: selectionControl', 'mode: selectionMode', 'limit: selectionLimit'],
  outputs: ['modelChange: selectionControlChange', 'change: selectionChange'],
})
export class SelectionControl<T> extends SelectionModel<T> implements OnInit, OnDestroy {
  private _limit: number | null;

  protected readonly ngDestroys = new Subject<void>();

  @Input() set model(value: T[]) {
    if (value != null) {
      this.deselect({ emitEvent: false });
      for (const entry of value) {
        this.select(entry);
      }
    }
  }
  @Output() readonly modelChange = new EventEmitter<T[]>();

  @Input() mode: 'single' | 'preservedSingle' | 'multiple' = 'multiple';

  @Input()
  set limit(value: number | null) {
    this._limit = coerceNumberProperty(value, null);
  }
  get limit(): number | null {
    return this._limit;
  }

  @Output() readonly changes = new EventEmitter<SelectionChange<T>>();

  @Input('selectionTrackBy') trackBy: PrimitiveTrackByFn<T> = (value) => value;

  constructor() {
    super([]);
  }

  ngOnInit(): void {
    this.pipe(takeUntil(this.ngDestroys)).subscribe((value) => this.modelChange.emit(value));
    // catching an edge case for initially setting the model while declaring the
    // input selection mode as 'single' if 'preservedSingle' is given this handling will
    // be skipped, but any new select operation will result in a single select
    if (this.size > 1 && this.mode === 'single') {
      const latestSelected = this.toArray()[this.size - 1];
      this.deselect({ emitEvent: false });
      this.select(latestSelected, { emitEvent: false });
    }
  }
  ngOnDestroy(): void {
    this.changes.complete();
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }

  select(value: T, options?: SelectOptions): void {
    if ((this.mode === 'preservedSingle' || this.mode === 'single') && !this.isEmpty) {
      this.deselect({ emitEvent: false });
    }
    if (this._limit == null || this.size < this._limit) {
      super.select(value, options);
    }
  }

  protected emitChange(type: 'select' | 'deselect' | 'clear', value?: T): void {
    this.changes.emit({ source: this, type, value });
  }
}
