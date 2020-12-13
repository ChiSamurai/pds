import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { DateTimeAdapter } from './date-time-adapter';
import { parseDate } from './parse-date';
import { TimeUnit } from './time-unit';

@Injectable()
export class NativeDateTimeAdapter extends DateTimeAdapter<Date> {
  now(): Date {
    return new Date();
  }

  valueOf(dt: Date): number {
    return dt.getTime();
  }

  format(dt: Date, format: string): string {
    return formatDate(dt, format, this.locale);
  }
  parse(value: string | number, format?: string): Date {
    return typeof value === 'number' ? new Date(value) : parseDate(value, format);
  }

  get(dt: Date, unit: TimeUnit | string): number {
    switch (unit) {
      case 'y': return dt.getFullYear();
      case 'm': return dt.getMonth();
      case 'd': return dt.getDate();
      case 'h': return dt.getHours();
      case 'min': return dt.getMinutes();
      case 's': return dt.getSeconds();
      case 'ms': return dt.getMilliseconds();
      default:
        throw new Error(`Unable to get "${unit}" from Date instance`);
    }
  }
  set(dt: Date, value: number, unit: TimeUnit | string): Date {
    const d = new Date(dt);
    switch (unit) {
      case 'y': d.setFullYear(value); break;
      case 'm': d.setMonth(value); break;
      case 'd': d.setDate(value); break;
      case 'h': d.setHours(value); break;
      case 'min': d.setMinutes(value); break;
      case 's': d.setSeconds(value); break;
      case 'ms': d.setMilliseconds(value); break;
      default:
        throw new Error(`Unable to set "${value} ${unit}" to Date instance`);
    }
    return d;
  }

  getWeekDay(dt: Date): number {
    return dt.getDay();
  }
}
