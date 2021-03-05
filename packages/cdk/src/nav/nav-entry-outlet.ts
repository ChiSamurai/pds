import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
  Predicate,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavEntries } from './nav-entries';
import { NavEntry } from './nav-entry';
import { NavEntryContainer } from './nav-entry-container';
import { NavigationEntryDefContext } from './nav-entry-def';

@Component({
  selector: 'nav-entry-outlet',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #fallbackEntryTemplate let-entry>
      <a [navEntryLink]="entry" target="_blank">
        {{ entry.name }}
      </a>
    </ng-template>

    <ng-container *ngFor="let entry of viewEntries | async">
      <ng-container
        *ngTemplateOutlet="resolveEntryTemplate(entry) || fallbackEntryTemplate; context: resolveEntryContext(entry)"
      ></ng-container>
    </ng-container>
  `,
})
export class NavEntryOutlet extends NavEntryContainer {
  /**
   * An instance of custom {@link NavEntries} to use for this outlet. This will not overwrite
   * any existing entries stored in {@link NavEntries}. Those will only be preferred for
   * rendering and stored locally on the component instance. Any existing {@link filter} value will
   * be applied nevertheless
   */
  protected readonly customState = new NavEntries();

  /** Gets the stream of {@link NavEntry}s that's used for rendering */
  readonly viewEntries = merge(this.customState, this.state).pipe(
    map(() => {
      const entries = this.customState.length ? this.customState.snapshot : this.state.snapshot;
      return typeof this.filter === 'function' ? entries.filter(this.filter) : entries;
    })
  );

  @Input()
  set entries(value: NavEntry[]) {
    this.customState.reset(...value);
  }
  get entries(): NavEntry[] {
    return this.customState.snapshot || this.state.snapshot;
  }

  @Input() context?: Omit<NavigationEntryDefContext, '$implicit'>;

  /** Gets or sets a filter {@link Predicate} for the rendered {@link NavEntry}s */
  @Input() filter: Predicate<NavEntry>;

  constructor(protected readonly state: NavEntries, @Optional() protected readonly parent?: NavEntryContainer) {
    super();
  }

  resolveEntryTemplate(entry: NavEntry): TemplateRef<NavigationEntryDefContext> | null {
    return this.parent?.resolveEntryTemplate(entry) || super.resolveEntryTemplate(entry);
  }
  resolveEntryContext(entry: NavEntry): NavigationEntryDefContext {
    return { ...this.context, $implicit: entry };
  }
}
