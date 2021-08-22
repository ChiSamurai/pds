import { Component, ViewEncapsulation } from '@angular/core';
import { AppGuidesService } from '../../../services/app-guides.service';

@Component({
  selector: 'pds-app-guide-page',
  templateUrl: 'app-guide-page.component.html',
  styleUrls: ['app-guide-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppGuidePageComponent {
  constructor(readonly appGuides: AppGuidesService) {}
}
