import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  Optional,
  Predicate,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationMenu } from '../navigation-menu/navigation-menu';
import { NavigationEntries } from './navigation-entries';
import { NavigationEntry } from './navigation-entry';
import { NavigationEntryContainer } from './navigation-entry-container';
import { NavigationEntryDefContext } from './navigation-entry-def';

@Component({
  selector: 'nav-entry-outlet',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #fallbackEntryTemplate let-entry>
      <div class="nav-entry" [navEntryLink]="entry" routerLinkActive="active" target="_blank">
        {{ entry.name }}
      </div>
    </ng-template>

    <ng-container *ngFor="let entry of viewEntries | async">
      <ng-container
        *ngTemplateOutlet="resolveEntryTemplate(entry) || fallbackEntryTemplate; context: { $implicit: entry }">
      </ng-container>
    </ng-container>`
})
export class NavigationEntryOutlet extends NavigationEntryContainer {
  /**
   * An instance of custom {@link NavigationEntries} to use for this outlet. This will not overwrite
   * any existing entries stored in {@link NavigationEntries}. Those will only be preferred for
   * rendering and stored locally on the component instance. Any existing {@link filter} value will
   * be applied nevertheless
   */
  protected readonly customState = new NavigationEntries();

  /** Gets the {@link Observable} of {@link NavigationEntry}s that's used for rendering */
  readonly viewEntries = merge(this.customState, this.state).pipe(map(() => {
    const entries = this.customState.length ? this.customState.snapshot : this.state.snapshot;
    return typeof this.filter === 'function'
      ? entries.filter(this.filter)
      : entries;
  }));

  @Input()
  set entries(value: NavigationEntry[]) {
    this.customState.reset(...value);
  }
  get entries(): NavigationEntry[] {
    return this.customState.snapshot || this.state.snapshot;
  }

  /** Gets or sets a filter {@link Predicate} for the rendered {@link NavigationEntry}s */
  @Input() filter: Predicate<NavigationEntry>;

  constructor(
    protected injector: Injector,
    protected readonly state: NavigationEntries,
    @Optional() protected readonly menu?: NavigationMenu
  ) {
    super();
  }

  resolveEntryTemplate(entry: NavigationEntry): TemplateRef<NavigationEntryDefContext> | null {
    return this.menu?.resolveEntryTemplate(entry) || super.resolveEntryTemplate(entry);
  }
}
