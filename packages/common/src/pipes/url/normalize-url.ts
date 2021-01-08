import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { normalizeUrl } from '../../utils';

@Pipe({ name: 'normalizeUrl' })
export class NormalizeUrlPipe implements PipeTransform {
  transform(baseUrl: string, ...segments: string[]): string {
    return normalizeUrl(baseUrl, ...segments);
  }
}

@NgModule({
  declarations: [ NormalizeUrlPipe ],
  exports: [ NormalizeUrlPipe ]
})
export class NormalizeUrlModule {
}
