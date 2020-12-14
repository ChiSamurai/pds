import { ModuleWithProviders, NgModule } from '@angular/core';
import { FlexBreak } from './flex-break';
import { FlexContainer } from './flex-container';
import {
  FLEX_CONTAINER_STATE,
  FlexContainerState,
  MEDIA_FLEX_CONTAINER_STATES,
  MediaFlexContainerState
} from './flex-container-state';

export interface FlexContainerModuleConfig {
  media?: MediaFlexContainerState[];
  default?: FlexContainerState;
}

const declarations = [
  FlexContainer,
  FlexBreak
];

@NgModule({
  exports: declarations,
  declarations
})
export class FlexContainerModule {
  static forRoot(config: FlexContainerModuleConfig): ModuleWithProviders<FlexContainerModule> {
    return {
      ngModule: FlexContainerModule,
      providers: [
        { provide: MEDIA_FLEX_CONTAINER_STATES, useValue: config.media },
        { provide: FLEX_CONTAINER_STATE, useValue: config.default }
      ]
    };
  }
}
