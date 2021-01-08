import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { isAbsoluteURL } from '../../utils';

@Pipe({ name: 'isAbsoluteUrl' })
export class IsAbsoluteUrlPipe implements PipeTransform {
  transform(url: string): boolean {
    return isAbsoluteURL(url);
  }
}

@NgModule({
  declarations: [ IsAbsoluteUrlPipe ],
  exports: [ IsAbsoluteUrlPipe ]
})
export class IsAbsoluteUrlPipeModule {
}
