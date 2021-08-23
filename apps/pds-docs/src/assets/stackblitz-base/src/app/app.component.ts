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
    <pds-alert class="success">ALAAAAARM!</pds-alert>
  `
})
export class AppComponent {
}
