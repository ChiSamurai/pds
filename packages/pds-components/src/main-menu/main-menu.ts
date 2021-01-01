import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NAV_MENU_TEMPLATE, NavigationEntryContainer, NavigationMenu } from '@vitagroup/cdk';

@Component({
  selector: 'pds-main-menu',
  styleUrls: ['./main-menu.scss'],
  providers: [{ provide: NavigationEntryContainer, useExisting: MainMenu }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: NAV_MENU_TEMPLATE,
})
export class MainMenu extends NavigationMenu {}
