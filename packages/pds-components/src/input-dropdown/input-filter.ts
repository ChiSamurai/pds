import { ChangeDetectorRef, Inject, InjectionToken, Pipe, PipeTransform } from '@angular/core';
import { ControlInputAccessor, INPUT_ACCESSOR, InputFilterBase, InputFilterFn } from '@vitagroup/cdk';

@Pipe({ name: 'pdsInputFilter', pure: false })
export class PdsInputFilterPipe extends InputFilterBase implements PipeTransform {}
