import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { ToastDef } from './toast-def';
import { ToastDispose } from './toast-dispose';

const declarations = [ToastDispose, ToastDef];

@NgModule({
  declarations,
  exports: declarations,
  imports: [OverlayModule],
})
export class ToasterModule {}
