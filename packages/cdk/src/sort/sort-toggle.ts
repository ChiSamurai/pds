import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkColumnDef } from '@angular/cdk/table';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
} from '@angular/core';
import { ShortcutManager, SortModel, SortOrder, SortParamParser } from '@vitagroup/common';
import { SortGroup } from './sort-group';

@Directive({
  selector: '[sort]',
  inputs: ['key: sort', 'canUnset: sortCanUnset', 'preferredOrder: sortPreferredOrder'],
  outputs: ['changes: sortChanges'],
})
export class SortToggle implements OnInit, OnDestroy {
  private _key: string;
  private _canUnset = false;

  readonly shortcuts = new ShortcutManager(this.renderer, this.elementRef);

  @Input()
  set key(value: string) {
    const { key, order } = this.paramParser.parseParam(value) || {};
    this._key = key;

    if (order != null) this.preferredOrder = order;
  }
  get key(): string {
    return this._key || this.columnDef.name;
  }

  @Input()
  set canUnset(value: boolean) {
    this._canUnset = coerceBooleanProperty(value);
  }
  get canUnset(): boolean {
    return this._canUnset;
  }

  @Input() preferredOrder: SortOrder = 'ascending';

  get order(): SortOrder | null {
    return this.sortModel.getOrder(this.key);
  }

  @Output()
  readonly changes = new EventEmitter<SortOrder | null>();

  constructor(
    protected renderer: Renderer2,
    protected elementRef: ElementRef,
    protected sortModel: SortModel,
    protected paramParser: SortParamParser,
    @Optional() protected columnDef: CdkColumnDef,
    @Optional() sortGroup: SortGroup
  ) {
    if (sortGroup != null) this.preferredOrder = sortGroup.preferredOrder;
  }

  set(order: SortOrder): void {
    this.sortModel.set(this.key, order);
    this.changes.emit(order);
  }
  unset(): void {
    this.sortModel.unset(this.key);
    this.changes.emit(null);
  }

  toggle(): void {
    if (!this.sortModel.isSet(this.key)) this.set(this.preferredOrder);
    else if (this.sortModel.isSet(this.key, this.preferredOrder))
      this.set(this.preferredOrder === 'ascending' ? 'descending' : 'ascending');
    else if (!this.canUnset) this.set(this.order === 'ascending' ? 'descending' : 'ascending');
    else this.unset();
  }

  ngOnInit() {
    this.shortcuts.register('click', () => this.toggle());
    this.shortcuts.register('enter', () => this.toggle());
    this.shortcuts.register('arrowdown', () => this.set('descending'));
    this.shortcuts.register('arrowup', () => this.set('ascending'));
  }
  ngOnDestroy() {
    this.shortcuts.clear();
  }
}
