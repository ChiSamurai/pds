import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NAV_MENU_TEMPLATE, NavigationMenu } from '@vitagroup/cdk';

@Component({
  selector: 'pds-main-menu',
  styleUrls: [ './main-menu.scss' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: NAV_MENU_TEMPLATE
})
export class MainMenu extends NavigationMenu {
}
