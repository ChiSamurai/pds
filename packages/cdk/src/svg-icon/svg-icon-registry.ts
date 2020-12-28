import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { BehaviorState, resolveObjectPropertyPath } from '@vitagroup/common';
import { ReplaySubject } from 'rxjs';

export type SvgIconData = string;

@Injectable({ providedIn: 'root' })
export class SvgIconRegistry {
  protected readonly state = new BehaviorState<any>();

  get icons(): Array<[string, SvgIconData]> {
    return this.state.snapshot && Object.entries(this.state.snapshot);
  }

  readonly registers = new ReplaySubject<[string, SvgIconData]>();
  readonly unregisters = new ReplaySubject<[string, SvgIconData]>();

  resolve(name: string): SvgIconData | null {
    return this.icons?.find((iconEntry) => iconEntry[0] === name)?.[1];
  }

  register(name: string, data: SvgIconData): void {
    this.state.patch({ [name]: data });
    this.registers.next([name, data]);
  }
  unregister(name: string): void {
    const icons = this.state.snapshot;
    if (name in icons) {
      this.unregisters.next([name, icons[name]]);

      delete icons[name];
      this.state.patch(icons);
    }
  }
}
