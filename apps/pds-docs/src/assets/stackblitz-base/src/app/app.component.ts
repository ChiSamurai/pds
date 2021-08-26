import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-app',
  styles: [`
  `
  ],
  styleUrls: [],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div>hello world</div>
    <pds-alert>ALAAAAARM!</pds-alert>
    <button class="primary">Primary</button>
    <button class="secondary">Secondary</button>
  `
})
export class AppComponent {
}
