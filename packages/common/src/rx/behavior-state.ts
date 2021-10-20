import { BehaviorSubject, Observable } from 'rxjs';
import { Primitive } from '../reflection/primitives';

/**
 * Basic reactive state implementation using a {@link BehaviorSubject} to hold and observe any
 * changes to the states value
 */
export class BehaviorState<T> {
  protected readonly subject: BehaviorSubject<T>;

  /** Gets a snapshot of the current state value */
  get snapshot(): T {
    return this.subject.getValue();
  }

  constructor(initialValue?: T) {
    this.subject = new BehaviorSubject(initialValue);
  }

  /** Gets the behavior state changes as {@link Observable} instance */
  asObservable(): Observable<T> {
    return this.subject.asObservable();
  }

  /**
   * Patches the current state value with a partially providable schema matching the states model.
   * Any other value will stay unchanged
   *
   * @param value The object value to be used for patching
   */
  patch(value: Partial<T>): T {
    this.subject.next(value && { ...this.snapshot, ...value });
    return this.snapshot;
  }
}

/**
 * Basic reactive array behavior state implementation using the {@link BehaviorState} as its base.
 * Support for patching, pushing, removing and resetting is provided out of the box
 */
export class ArrayBehaviorState<T> extends BehaviorState<T[]> {
  /** Gets the length of the current value */
  get length(): number {
    return this.snapshot.length || 0;
  }

  /** Gets the first element within the current state snapshot */
  get first(): T | null {
    return this.snapshot?.[0];
  }
  /** Gets the last element within the current state snapshot */
  get last(): T | null {
    return this.snapshot?.[this.length - 1];
  }

  constructor(initialValue: Iterable<T> = []) {
    super(Array.from(initialValue));
  }

  /**
   * Patches the behavior state value at the given index using one or more values
   *
   * @param value The value used for patching the state
   * @param index Optional index value. Defaults to `0`
   */
  patch(value: T[], index: number = 0): T[] {
    this.subject.next([...this.snapshot.slice(0, index), ...value, ...this.snapshot.slice(index + value.length)]);
    return this.snapshot;
  }

  /**
   * Pushes one or more values to the current behavior state value
   *
   * @param values The values that should be added to the state
   */
  push(...values: T[]): T[] {
    this.subject.next([...this.snapshot, ...values]);
    return this.snapshot;
  }

  /**
   * Removes one or more values from the current behavior state value by their respective indices
   *
   * @param indices The indices of the values that should be removed
   */
  removeAt(...indices: number[]): T[] {
    this.subject.next(this.snapshot.filter((entry, index) => !indices.includes(index)));
    return this.snapshot;
  }

  /**
   * Resets the current behavior state value using a optional value to reset to
   *
   * @param values Optional values to set as new behavior state value
   */
  reset(...values: T[]): T[] {
    this.subject.next(values);
    return this.snapshot;
  }
}

/** Basic reactive state implementation for primitive values */
export class PrimitiveBehaviorState<T extends Primitive> extends BehaviorState<T> {
  patch(value: T): T {
    this.subject.next(value);
    return this.snapshot;
  }
}
