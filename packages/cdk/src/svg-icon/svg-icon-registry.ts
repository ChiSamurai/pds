import { Injectable } from '@angular/core';
import { BehaviorState } from '@vitagroup/common';
import { Subject } from 'rxjs';

export type SvgIconData = string;

@Injectable({ providedIn: 'root' })
export class SvgIconRegistry {
  protected readonly state = new BehaviorState<any>({});

  get icons(): Array<[string, SvgIconData]> {
    return this.state.snapshot && Object.entries(this.state.snapshot);
  }

  readonly registers = new Subject<[string, SvgIconData]>();
  readonly unregisters = new Subject<[string, SvgIconData]>();

  has(name: string): boolean {
    return name in this.state.snapshot;
  }
  resolve(name: string): SvgIconData | null {
    return this.state.snapshot[name];
  }

  /**
   * Lazily registers a new icon definition in the registry. This will **not** overwrite any
   * existing definition, if the provided `name` value already exists, by default. You can disable
   * that behavior by setting the `force` parameter to `true`.
   *
   * @param name  The name to identify the {@link SvgIconData} with
   * @param data  The desired {@link SvgIconData} to be registered
   * @param force Optional flag to overwrite any existing {@link SvgIconData}, if the `name` already exists
   */
  register(name: string, data: SvgIconData, force?: boolean): void {
    if (!this.has(name)) {
      this.state.patch({ [name]: data });
      this.registers.next([name, data]);
    }
  }
  unregister(name: string): void {
    if (this.has(name)) {
      this.unregisters.next([name, this.resolve(name)]);

      const icons = this.state.snapshot;
      delete icons[name];
      this.state.patch(icons);
    }
  }
}
