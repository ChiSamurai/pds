import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { DialogDispose } from './dialog-dispose';
import { DialogOverlay } from './dialog-overlay';

const declarations = [ DialogDispose ];

@NgModule({
  declarations,
  exports: declarations,
  imports: [ OverlayModule ],
  providers: [ DialogOverlay ]
})
export class DialogOverlayModule {
}
