import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { resolveObjectPropertyPath } from '../reflection/resolve-object-property-path';
import { BehaviorState } from '../rx/behavior-state';

export type SvgIconData = string;

export interface SvgIconImportConfig<Icon = any> {
  icons: Icon[];
  idSelector: string[] | string;
  idRewrite?: Array<{
    replace: RegExp | string;
    with: string;
  }>;
  dataSelector: string[] | string;
}

export const SVG_ICON_IMPORT = new InjectionToken<SvgIconImportConfig>('SVG_ICON_IMPORT');

@Injectable({ providedIn: 'root' })
export class SvgIconRegistry {

  protected readonly state = new BehaviorState<any>();

  get icons(): Array<[ string, SvgIconData ]> {
    return this.state.snapshot && Object.entries(this.state.snapshot);
  }

  readonly registers = new ReplaySubject<[ string, SvgIconData ]>();
  readonly unregisters = new ReplaySubject<[ string, SvgIconData ]>();

  constructor(@Optional() @Inject(SVG_ICON_IMPORT) importConfig: /* @dynamic */ SvgIconImportConfig) {
    if (importConfig != null) this.import(importConfig);
  }

  resolve(id: string): SvgIconData | null {
    return this.icons?.find(iconEntry => iconEntry[ 0 ] === id)?.[ 1 ];
  }

  register(id: string, data: SvgIconData): void {
    this.state.patch({ [ id ]: data });
    this.registers.next([ id, data ]);
  }
  unregister(id: string): void {
    const icons = this.state.snapshot;
    if (id in icons) {
      this.unregisters.next([ id, icons[ id ] ]);

      delete icons[ id ];
      this.state.patch(icons);
    }
  }

  import(config: SvgIconImportConfig): void {
    const { idSelector, idRewrite, dataSelector } = config;
    for (const icon of config.icons) {
      const data = resolveObjectPropertyPath(icon, dataSelector);
      let id = resolveObjectPropertyPath(icon, idSelector)?.toString();
      if (id == null || id.trim() === '')
        throw new Error(`Unable to import svg icons. Failed to select id for "${icon}"`);
      if (idRewrite != null) {
        for (const { replace, with: rWith } of config.idRewrite) {
          id = id.replace(replace, rWith);
        }
      }
      this.register(id, data);
    }
  }

}
