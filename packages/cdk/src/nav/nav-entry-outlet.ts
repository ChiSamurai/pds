import { coerceBooleanProperty } from '@angular/cdk/coercion';
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
import { NavEntryState } from './nav-entry-state';
import { NavEntry } from './nav-entry';
import { NavEntryContainer } from './nav-entry-container';
import { NavEntryDefContext } from './nav-entry-def';

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
  private _inferEntries = true; // whether the outlet should use any existing parent state entries or not

  /**
   * An instance of custom {@link NavEntryState} to use for this outlet. This will not overwrite
   * any existing entries stored in {@link NavEntryState}. Those will only be preferred for
   * rendering and stored locally on the component instance. Any existing {@link filter} value will
   * be applied nevertheless
   */
  protected readonly customState = new NavEntryState();

  /** Gets the stream of {@link NavEntry}s that's used for rendering */
  readonly viewEntries = merge(this.customState, this.state).pipe(
    map(() => {
      const entries = this.customState.length || !this._inferEntries ? this.customState.snapshot : this.state.snapshot;
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

  @Input()
  set inferEntries(value: boolean) {
    this._inferEntries = coerceBooleanProperty(value);
  }
  get inferEntries(): boolean {
    return this._inferEntries;
  }

  @Input() context?: Omit<NavEntryDefContext, '$implicit'>;

  /** Gets or sets a filter {@link Predicate} for the rendered {@link NavEntry}s */
  @Input() filter: Predicate<NavEntry>;

  constructor(
    @Optional() protected readonly state?: NavEntryState,
    @Optional() protected readonly parent?: NavEntryContainer
  ) {
    super();
  }

  resolveEntryTemplate(entry: NavEntry): TemplateRef<NavEntryDefContext> | null {
    return this.parent?.resolveEntryTemplate(entry) || super.resolveEntryTemplate(entry);
  }
  resolveEntryContext(entry: NavEntry): NavEntryDefContext {
    return { ...this.context, $implicit: entry };
  }
}
