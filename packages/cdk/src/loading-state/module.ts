import { OverlayModule } from '@angular/cdk/overlay';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { ElementLoadingState } from './element-loading-state';
import {
  LOADING_INDICATOR_COMPONENT,
  LoadingIndicatorOutlet,
} from './loading-indicator';
import {
  LOADING_OVERLAY_STRATEGY,
  LoadingOverlay,
  LoadingOverlayStrategy,
} from './loading-overlay';

const declarations = [LoadingIndicatorOutlet, ElementLoadingState];

export interface LoadingStateModuleConfig {
  /**
   * Sets the type of component that should be embedded as loading indicator. The value
   * will be used as "root" value for the {@link LOADING_INDICATOR_COMPONENT} injection
   * token used by any {@link LoadingIndicatorOutlet} instance. The injection token can
   * be overwritten at any component tree level
   */
  indicator: Type<any>;
  /**
   * Optionally sets the strategy that should be used for the {@link LoadingOverlay} provider.
   * The overlay will globally block the user from using any elements as long as the operation
   * persists
   */
  overlayStrategy?: LoadingOverlayStrategy;
}

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    OverlayModule
  ]
})
export class LoadingStateModule {
  static forRoot(
    config: LoadingStateModuleConfig
  ): ModuleWithProviders<LoadingStateModule> {
    return {
      ngModule: LoadingStateModule,
      providers: [
        { provide: LOADING_INDICATOR_COMPONENT, useValue: config.indicator },
        { provide: LOADING_OVERLAY_STRATEGY, useValue: config.overlayStrategy },
      ],
    };
  }

  constructor(overlay: LoadingOverlay) {
  }
}
