import { Pipe, PipeTransform } from '@angular/core';
import { InputFilterBase } from '@vitagroup/cdk';

@Pipe({ name: 'pdsInputFilter', pure: false })
export class PdsInputFilterPipe extends InputFilterBase implements PipeTransform {}
