import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slice' })
export class SlicePipe implements PipeTransform {
  transform(value: string | any[], start?: number, end?: number): any {
    return Array.isArray(value)
      ? Array.from(value).slice(start, end)
      : value?.slice(start, end);
  }
}

@NgModule({
  declarations: [SlicePipe],
  exports: [SlicePipe],
})
export class SlicePipeModule {}
