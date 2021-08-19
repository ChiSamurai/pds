import { NgModule, Pipe, PipeTransform } from '@angular/core';

export function clip<T extends string | number>(value: T, max: number): string {
  const ELLIPSIS = '\u2026'; // unicode for …

  if (typeof value === 'number') {
    return `${Math.min(value, max)}${value > max ? '+' : ''}`;
  } else if (typeof value === 'string') {
    return `${value.length > max ? value.slice(0, max) : value}${ELLIPSIS}`;
  } else return value?.toString();
}

@Pipe({name: 'clip'})
export class ClipPipe implements PipeTransform {
  transform(value: string | number, max: number): string {
    return clip(value, max);
  }
}

@NgModule({
  declarations: [ClipPipe],
  exports: [ClipPipe]
})
export class ClipPipeModule {
}
