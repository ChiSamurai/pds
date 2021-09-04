import { Component, ViewEncapsulation } from '@angular/core';
import { AppGuidesService } from '../../services/app-guides.service';

@Component({
  selector: 'pds-app-css-page',
  templateUrl: './app-css-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppCssPageComponent {
  constructor(readonly appGuides: AppGuidesService) {}
}
