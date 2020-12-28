import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ObjectPropertySelector, resolveObjectPropertySelector } from '@vitagroup/common';
import { SvgIconRegistry } from './svg-icon-registry';

export interface SvgIconImportConfig<Icon = any> {
  /** Defines all icons that should be imported */
  icons: Icon[];
  /**
   * Defines how to and what property of the {@link icons} type should be used to
   * retrieve the {@link SvgIconData}. Defaults to `"data"`
   */
  dataSelector?: ObjectPropertySelector<Icon>;
  /**
   * Defines how to and what property of the {@link icons} type should be used to
   * retrieve the _unique_ name of the svg icon. Defaults to `"name"`
   */
  nameSelector?: ObjectPropertySelector<Icon>;
}

export const SVG_ICON_IMPORT = new InjectionToken<SvgIconImportConfig>('SVG_ICON_IMPORT');

@Injectable({ providedIn: 'any' })
export class SvgIconImporter {
  constructor(
    protected registry: SvgIconRegistry,
    @Optional() @Inject(SVG_ICON_IMPORT) importConfig: /* @dynamic */ SvgIconImportConfig
  ) {
    if (importConfig != null) this.import(importConfig);
  }

  import(config: SvgIconImportConfig): void {
    let { nameSelector, dataSelector } = config;

    if (!dataSelector) dataSelector = 'data';
    if (!nameSelector) nameSelector = 'name';

    for (const icon of config.icons) {
      const data = resolveObjectPropertySelector(icon, dataSelector);
      const name = resolveObjectPropertySelector(icon, nameSelector);
      if (name == null || name.trim() === '')
        throw new Error(`Unable to import svg icons. Failed to select name for "${icon}"`);

      this.registry.register(name, data);
    }
  }
}
