import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface SelectionOptions {
  emitEvent?: boolean;
}

export type SelectOptions = SelectionOptions;
export type DeselectOptions = SelectionOptions;
export type ToggleOptions = SelectionOptions;

export interface SelectionChange<T = any> {
  source: SelectionModel<T>;
  type: 'select' | 'deselect' | 'clear';
  value?: T;
}

export type PrimitiveTrackByFn<T> = (value: T) => any;

export class SelectionModel<T = any> extends Observable<T[]> {
  private _changes = new Subject<SelectionChange<T>>();

  protected value: T[];

  readonly changes: Observable<SelectionChange<T>> = this._changes.asObservable();

  protected readonly trackBy: PrimitiveTrackByFn<T> = (value) => value;

  get isEmpty(): boolean {
    return this.size === 0;
  }

  get size(): number {
    return this.value.length;
  }

  constructor(trackBy?: PrimitiveTrackByFn<T>);
  constructor(initialValue?: Iterable<T>, trackBy?: PrimitiveTrackByFn<T>);
  constructor(initialValueOrTrackBy?: Iterable<T> | PrimitiveTrackByFn<T>, trackBy?: PrimitiveTrackByFn<T>) {
    super((subscriber) => {
      this._changes.pipe(map(() => this.toArray())).subscribe(subscriber);
    });
    trackBy = typeof initialValueOrTrackBy === 'function' ? initialValueOrTrackBy : trackBy;
    const initialValue = typeof initialValueOrTrackBy === 'function' ? [] : initialValueOrTrackBy;
    if (typeof trackBy === 'function') this.trackBy = trackBy;
    this.value = initialValue != null ? Array.from(initialValue) : [];
  }

  isSelected(value: T): boolean {
    return this.value.some((value2) => this.equalValueIdentity(value, value2));
  }

  select(value: T, options?: SelectOptions): void {
    if (!this.isSelected(value)) this.value = [value, ...this.value];
    if (this.shouldEmit(options)) this.emitChange('select', value);
  }

  deselect(options?: DeselectOptions): void;
  deselect(value: T, options?: DeselectOptions): void;
  deselect(valueOrOptions?: T | DeselectOptions, options?: DeselectOptions): void {
    const shouldClear = valueOrOptions == null || this._isOptionsObject(valueOrOptions);
    const value: T = shouldClear ? null : (valueOrOptions as T);
    options = this._isOptionsObject(valueOrOptions) ? valueOrOptions : options;
    if (shouldClear) {
      this.value = [];
      if (this.shouldEmit(options)) this.emitChange('clear');
    } else if (this.isSelected(value)) {
      this.value = this.value.filter((value2) => !this.equalValueIdentity(value, value2));
      if (this.shouldEmit(options)) this.emitChange('deselect', value);
    }
  }

  toggle(value: T, options?: ToggleOptions): void {
    if (this.isSelected(value)) this.deselect(value, options);
    else this.select(value, options);
  }

  toArray(): T[] {
    return Array.from(this.value);
  }

  protected shouldEmit(options: SelectOptions | DeselectOptions): boolean {
    return options && options.emitEvent != null ? options.emitEvent : true;
  }
  protected emitChange(type: SelectionChange['type'], value?: T): void {
    this._changes.next({ source: this, type, value });
  }

  protected equalValueIdentity(value1: T, value2: T): boolean {
    return this.trackBy(value1) === this.trackBy(value2);
  }

  private _isOptionsObject(obj: any): obj is SelectionOptions {
    // todo: keep up to date with the SelectionOptions interface!
    return obj != null && Object.keys(obj).every((key) => ['emitEvent'].includes(key));
  }
}

export class SingleSelectionModel<T> extends SelectionModel<T> {
  select(value: T, options?: SelectOptions): void {
    if (!this.isEmpty) this.deselect(options);
    super.select(value, options);
  }
}
