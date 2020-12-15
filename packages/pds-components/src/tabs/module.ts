import { NgModule } from '@angular/core';
import { Tab } from './tab';
import { Tabs } from './tabs';

const declarations = [
  Tabs,
  Tab
];

@NgModule({
  declarations,
  exports: declarations
})
export class TabsModule {
}
