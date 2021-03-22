import { ChangeDetectorRef, Inject, InjectionToken, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { ControlInputAccessor, INPUT_ACCESSOR } from '@vitagroup/cdk';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type InputFilterFn<T> = (value: T, input?: string) => boolean;

export const DEFAULT_INPUT_FILTER = new InjectionToken<InputFilterFn<unknown>>('DEFAULT_INPUT_FILTER', {
  providedIn: 'root',
  factory: () => (value, input) => {
    const matchesInput = (value2) => `${value2}`.toLowerCase().includes(input.toLowerCase());

    if (typeof value === 'function') return false;
    else if (typeof value !== 'object') return matchesInput(value);
    else Object.values(value)?.some((innerValue) => matchesInput(innerValue));
  },
});

@Pipe({ name: 'pdsInputFilter', pure: false })
export class InputFilterPipe implements PipeTransform, OnDestroy {
  protected readonly ngDestroys = new Subject();

  constructor(
    @Inject(INPUT_ACCESSOR) readonly inputAccessor: ControlInputAccessor,
    @Inject(DEFAULT_INPUT_FILTER) protected defaultFilter: InputFilterFn<unknown>,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    this.inputAccessor.input
      .asObservable()
      .pipe(takeUntil(this.ngDestroys))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }

  transform<T>(value: Iterable<T>, filter: InputFilterFn<T> = this.defaultFilter): T[] {
    const input = this.inputAccessor?.input.snapshot;
    let result = value ? Array.from(value) : [];

    if (input) result = result.filter((it) => filter(it, input));

    return result;
  }

  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
