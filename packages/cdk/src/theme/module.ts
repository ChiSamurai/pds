import { ModuleWithProviders, NgModule } from '@angular/core';
import { ACTIVE_THEMES, Theme, THEMES } from './theme';

export interface ThemeModuleConfig {
  themes: string[];
  activeThemes?: string[];
}

@NgModule()
export class ThemeModule {
  static forRoot(config: ThemeModuleConfig): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        { provide: THEMES, useValue: config.themes },
        { provide: ACTIVE_THEMES, useValue: config.activeThemes },
        Theme,
      ],
    };
  }
}
