import { ChangeDetectorRef, Inject, InjectionToken, Pipe, PipeTransform } from '@angular/core';
import { ControlInputAccessor, INPUT_ACCESSOR, InputFilterBase, InputFilterFn } from '@vitagroup/cdk';

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
export class InputFilterPipe extends InputFilterBase implements PipeTransform {
  constructor(
    @Inject(INPUT_ACCESSOR) readonly inputAccessor: ControlInputAccessor,
    @Inject(DEFAULT_INPUT_FILTER) protected defaultFilter: InputFilterFn<unknown>,
    protected changeDetectorRef: ChangeDetectorRef
  ) {
    super(inputAccessor, defaultFilter, changeDetectorRef);
  }
}
