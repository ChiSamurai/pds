import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { NavBase, NavEntryContainer } from '@vitagroup/cdk';

@Component({
  selector: 'pds-nav',
  styleUrls: ['./nav.scss'],
  providers: [{ provide: NavEntryContainer, useExisting: Nav }],
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

    <ng-container *ngIf="staticState.asObservable() | async as staticEntries">
      <nav-entry-outlet class="static" [entries]="staticEntries" [context]="{ static: true }">
        <ng-container *navEntryDef="let entry">
          <ng-container
            *templateOutlet="fallbackEntryTemplate; context: { $implicit: entry }; ngClass: 'static'"
          ></ng-container>
        </ng-container>
      </nav-entry-outlet>
    </ng-container>
  `,
})
export class Nav extends NavBase {}
