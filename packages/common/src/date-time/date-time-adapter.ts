import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { TimeUnit} from './time-unit';

@Injectable()
export abstract class DateTimeAdapter<D> {
  constructor(@Inject(LOCALE_ID) readonly locale: any) {
  }

  abstract now(): D;

  abstract parse(value: string | number, format?: string): D;
  abstract format(dt: D, format: string): string;

  abstract valueOf(dt: D): number;

  abstract getWeekDay(dt: D): number;

  abstract get(dt: D, unit: TimeUnit | string): number;
  abstract set(dt: D, value: number, unit: TimeUnit | string): D;

  translate(dt: D, value: number, unit: TimeUnit | string): D {
    const currentValue = this.get(dt, unit);
    return this.set(dt, currentValue + value, unit);
  }

  equal(dt: D, other: D): boolean {
    return this.valueOf(dt) === this.valueOf(other);
  }

  isBefore(dt: D, other: D): boolean {
    return this.valueOf(dt) < this.valueOf(other);
  }
  isAfter(dt: D, other: D): boolean {
    return this.valueOf(dt) > this.valueOf(other);
  }
}
