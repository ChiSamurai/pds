import { ChangeDetectorRef, Directive, Inject, OnDestroy, PipeTransform } from '@angular/core';
import { ControlInputAccessor, INPUT_ACCESSOR } from '@vitagroup/cdk';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type InputFilterFn<T> = (value: T, input?: string) => boolean;

@Directive()
export abstract class InputFilterBase implements PipeTransform, OnDestroy {
  protected readonly ngDestroys = new Subject();

  constructor(
    @Inject(INPUT_ACCESSOR) readonly inputAccessor: ControlInputAccessor,
    protected defaultFilter: InputFilterFn<unknown>,
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
