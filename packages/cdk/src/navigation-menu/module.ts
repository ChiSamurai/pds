import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationModule } from '../navigation/module';
import { NavigationMenu } from './navigation-menu';

@NgModule({
  declarations: [NavigationMenu],
  exports: [NavigationMenu],
  imports: [NavigationModule, CommonModule],
})
export class NavigationMenuModule {}
