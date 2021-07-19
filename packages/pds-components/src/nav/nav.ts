import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
  Input,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { NavBase, NavEntry, NavEntryContainer, NavEntryState } from '@vitagroup/cdk';

/**
 * Holds a reference to the secondary {@link NavEntry}s that are displayed in the bottom
 * region of a `pds-nav` element
 */
export const PDS_SECONDARY_NAV_ENTRIES = new InjectionToken<NavEntry[]>('PDS_SECONDARY_NAV_ENTRIES');

@Component({
  selector: 'pds-nav',
  styleUrls: ['./nav.scss'],
  providers: [{ provide: NavEntryContainer, useExisting: PdsNav }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #fallbackEntryTemplate let-entry>
      <pds-nav-entry [entry]="entry">{{ entry.name }}</pds-nav-entry>
    </ng-template>

    <ng-content></ng-content>

    <ng-container *ngIf="state.asObservable() | async as entries">
      <nav-entry-outlet *ngIf="entries?.length > 0" role="navigation">
        <ng-container *navEntryDef="let entry">
          <ng-container *ngTemplateOutlet="fallbackEntryTemplate; context: { $implicit: entry }"></ng-container>
        </ng-container>
      </nav-entry-outlet>
    </ng-container>

    <ng-container *ngIf="secondaryState.asObservable() | async as secondaryEntries">
      <nav-entry-outlet class="secondary" [entries]="secondaryEntries" [context]="{ secondary: true }">
        <ng-container *navEntryDef="let entry">
          <ng-container
            *templateOutlet="fallbackEntryTemplate; context: { $implicit: entry }; ngClass: 'static'"
          ></ng-container>
        </ng-container>
      </nav-entry-outlet>
    </ng-container>
  `,
})
export class PdsNav extends NavBase {
  readonly secondaryState = new NavEntryState([]);

  @Input()
  set secondaryEntries(value: NavEntry[]) {
    this.secondaryState.reset(...value);
  }
  get secondaryEntries(): NavEntry[] {
    return this.secondaryState.snapshot;
  }

  constructor(
    readonly state: NavEntryState,
    @Optional()
    @Inject(PDS_SECONDARY_NAV_ENTRIES)
    initialSecondaryEntries?: NavEntry[]
  ) {
    super(state);

    if (initialSecondaryEntries?.length > 0) this.secondaryState.reset(...initialSecondaryEntries);
  }
}
