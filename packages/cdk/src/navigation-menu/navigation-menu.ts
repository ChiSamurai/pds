import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEntries } from '../navigation/navigation-entries';
import { NavigationEntry } from '../navigation/navigation-entry';
import { NavigationEntryContainer } from '../navigation/navigation-entry-container';

/**
 * Holds a reference to the static {@link NavigationEntry}s that are displayed in a separate
 * region of the `nav-menu` instance
 */
export const STATIC_NAVIGATION_ENTRIES = new InjectionToken<NavigationEntry[]>('STATIC_NAVIGATION_ENTRIES');

export const NAV_MENU_TEMPLATE = `
    <ng-content></ng-content>

    <ng-container *ngIf="state.asObservable() | async as entries">
      <nav class="nav-entries" *ngIf="entries?.length > 0">
        <nav-entry-outlet></nav-entry-outlet>
      </nav>
    </ng-container>
    <ng-container *ngIf="staticState.asObservable() | async as staticEntries">
      <div class="nav-entries nav-entries-static" *ngIf="staticEntries.length > 0">
        <nav-entry-outlet [entries]="staticEntries" [context]="{ static: true }"></nav-entry-outlet>
      </div>
    </ng-container>
`;

@Component({
  selector: 'nav-menu',
  styleUrls: ['./navigation-menu.scss'],
  providers: [{ provide: NavigationEntryContainer, useExisting: NavigationMenu }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: NAV_MENU_TEMPLATE,
})
export class NavigationMenu extends NavigationEntryContainer {
  readonly staticState = new NavigationEntries();

  @Input()
  set entries(value: NavigationEntry[]) {
    this.state.reset(...value);
  }
  get entries(): NavigationEntry[] {
    return this.state.snapshot;
  }

  constructor(
    readonly state: NavigationEntries,
    @Optional()
    @Inject(STATIC_NAVIGATION_ENTRIES)
    staticEntries?: NavigationEntry[]
  ) {
    super();

    if (staticEntries?.length > 0) this.staticState.reset(...staticEntries);
  }
}
