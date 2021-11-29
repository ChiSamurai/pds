import { Inject, NgModule, Pipe, PipeTransform } from '@angular/core';
import {
  STRING_INTERPOLATION_REPLACER,
  STRING_INTERPOLATION_SCHEME,
  StringInterpolationReplaceFn,
  StringInterpolationScheme,
  StringInterpolator,
} from '../../string/string-interpolator';

@Pipe({ name: 'interpolate' })
export class StringInterpolatePipe implements PipeTransform {
  constructor(
    readonly interpolator: StringInterpolator,
    @Inject(STRING_INTERPOLATION_SCHEME)
    readonly interpolationScheme: /* @dynamic */ StringInterpolationScheme,
    @Inject(STRING_INTERPOLATION_REPLACER)
    protected readonly replacer: /* @dynamic */ StringInterpolationReplaceFn
  ) {}

  transform(value: string, params: any, scheme = this.interpolationScheme, replacer = this.replacer): string {
    return this.interpolator.interpolate(value, params, scheme, replacer);
  }
}

@NgModule({
  declarations: [StringInterpolatePipe],
  exports: [StringInterpolatePipe],
})
export class StringInterpolatePipeModule {}
