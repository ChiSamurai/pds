import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pds-app',
  styles: [`
  `
  ],
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div>hello world</div>
  `
})
export class AppComponent {
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
