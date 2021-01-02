import { NgModule } from '@angular/core';
import { TextBox } from './text-box';

const declarations = [TextBox];

@NgModule({
  declarations,
  exports: declarations,
})
export class TextBoxModule {}
