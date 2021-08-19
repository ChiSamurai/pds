import { coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';
import { ShortcutManager } from '@vitagroup/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ElementFocusAccessor,
  ElementFocusState,
  resolveElementFocusState,
} from '../element-state/element-focus-state';
import { PrimitiveTrackByFn, SelectionChange, SelectionModel, SelectOptions, ToggleOptions } from './selection-model';
import { SELECTION_VALUE, SelectionValue } from './selection-value';

@Directive({
  exportAs: 'selectionControl',
  selector: '[selectionControl]',
  providers: [
    { provide: SelectionModel, useExisting: SelectionControl },
    { provide: ElementFocusState, useFactory: resolveElementFocusState, deps: [SelectionControl] },
  ],
  host: { '[attr.tabindex]': '0' },
  inputs: [
    'model: selectionControl',
    'mode: selectionMode',
    'limit: selectionLimit',
    'focusIndex: selectionFocusIndex',
    'trackBy: selectionTrackBy',
  ],
  outputs: ['modelChange: selectionControlChange', 'change: selectionChange'],
})
export class SelectionControl<T> extends SelectionModel<T> implements OnInit, OnDestroy, ElementFocusAccessor {
  private _limit: number | null;

  @ContentChildren(SELECTION_VALUE, { descendants: true })
  protected readonly selectionValues: QueryList<SelectionValue>;
  protected readonly ngDestroys = new Subject<void>();

  readonly shortcuts = new ShortcutManager(this.renderer, this.elementRef);
  readonly focus = new ElementFocusState(this.elementRef, this.renderer);

  @Input() mode: 'single' | 'preservedSingle' | 'multiple' = 'single';

  @Input() set model(value: T[]) {
    this.reset(value);
  }
  @Output() readonly modelChange = new EventEmitter<T[]>();

  @Input()
  set limit(value: number | null) {
    this._limit = coerceNumberProperty(value, null);
  }
  get limit(): number | null {
    return this._limit;
  }

  get focusValue(): SelectionValue | null {
    return this.selectionValues?.find((value) => value.focus.isSet);
  }
  get focusValueIndex(): number | null {
    return this.selectionValues?.toArray().findIndex((value) => value.focus.isSet);
  }

  @Output() readonly changes = new EventEmitter<SelectionChange<T>>();

  @Input() trackBy: PrimitiveTrackByFn<T> = (value) => value;

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {
    super([]);
  }

  ngOnInit(): void {
    this.pipe(takeUntil(this.ngDestroys)).subscribe((value) => this.modelChange.emit(value));

    this.shortcuts.register('document:enter', (e) => {
      e.preventDefault();
      this.toggleFocusValue();
    });
    this.shortcuts.register('document:shift+enter', (e) => {
      e.preventDefault();
      this.toggleFocusValue();
    });
    // IMPORTANT: do not remove the (shift) modifier from the space shortcut below! doing this will result
    // in unintended preventions for other component and directive interactions
    this.shortcuts.register('document:shift+space', (e) => {
      e.preventDefault();
      this.toggleFocusValue();
    });
    this.shortcuts.register('document:arrowdown', (e) => {
      e.preventDefault();
      this.focusNextValue();
    });
    this.shortcuts.register('document:arrowup', (e) => {
      e.preventDefault();
      this.focusPreviousValue();
    });
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
    this.shortcuts.clear();
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

  toggleFocusValue(options?: ToggleOptions): void {
    if (this.focus.isSet) this.focusValue?.toggle(options);
  }

  focusNextValue(): void {
    const nextIndex = this.focusValueIndex + 1;
    const nextValue = nextIndex && this.selectionValues?.toArray()?.[nextIndex];

    this.focusValue?.focus.unset();

    if (nextValue) nextValue.focus.set();
    else this.selectionValues?.first?.focus.set();
  }
  focusPreviousValue(): void {
    const previousIndex = this.focusValueIndex - 1;
    const previousValue = this.selectionValues?.toArray()?.[previousIndex];

    this.focusValue?.focus.unset();

    if (previousValue) previousValue.focus.set();
    else this.selectionValues?.last?.focus.set();
  }

  protected emitChange(type: 'select' | 'deselect' | 'clear', value?: T): void {
    this.changes.emit({ source: this, type, value });
  }
}
