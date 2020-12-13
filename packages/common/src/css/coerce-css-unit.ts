import { CSSUnit } from './css-unit';

export function coerceCSSUnit(value: any, unit: CSSUnit, fallback?: number): string {
  return `${Number(value || fallback).toString(10)}${unit}`;
}
