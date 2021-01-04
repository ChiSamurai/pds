import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '@vitagroup/cdk';
import { Nav } from './nav';
import { NavEntry } from './nav-entry';

const declarations = [Nav, NavEntry];

@NgModule({
  declarations,
  exports: declarations,
  imports: [NavigationModule, CommonModule, RouterModule],
})
export class MainMenuModule {}
