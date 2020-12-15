import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationModule } from '@vitagroup/cdk';
import { MainMenu } from './main-menu';

const declarations = [ MainMenu ];

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    NavigationModule,
    CommonModule
  ]
})
export class MainMenuModule {
}
