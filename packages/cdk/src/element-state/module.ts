import { NgModule } from '@angular/core';
import { ElementActiveAccessorDirective } from './element-active-state';
import { ElementDisabledAccessorDirective } from './element-disabled-state';
import { ElementFocusAccessorDirective } from './element-focus-state';
import { ElementReadonlyAccessorDirective } from './element-read-only-state';

const declarations = [
  ElementActiveAccessorDirective,
  ElementFocusAccessorDirective,
  ElementDisabledAccessorDirective,
  ElementReadonlyAccessorDirective,
];

@NgModule({
  declarations,
  exports: declarations,
})
export class ElementStateModule {}
