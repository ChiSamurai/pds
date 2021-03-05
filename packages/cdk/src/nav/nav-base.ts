import { Directive, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { NavEntries } from './nav-entries';
import { NavEntry } from './nav-entry';
import { NavEntryContainer } from './nav-entry-container';

/**
 * Holds a reference to the static {@link NavEntry}s that are displayed in a separate
 * region of the `nav-menu` instance
 */
export const STATIC_NAVIGATION_ENTRIES = new InjectionToken<NavEntry[]>('STATIC_NAVIGATION_ENTRIES');

@Directive()
export class NavBase extends NavEntryContainer {
  readonly staticState = new NavEntries();

  @Input()
  set entries(value: NavEntry[]) {
    this.state.reset(...value);
  }
  get entries(): NavEntry[] {
    return this.state.snapshot;
  }

  @Input()
  set staticEntries(value: NavEntry[]) {
    this.staticState.reset(...value);
  }
  get staticEntries(): NavEntry[] {
    return this.staticState.snapshot;
  }

  constructor(
    readonly state: NavEntries,
    @Optional()
    @Inject(STATIC_NAVIGATION_ENTRIES)
    staticEntries?: NavEntry[]
  ) {
    super();

    if (staticEntries?.length > 0) this.staticState.reset(...staticEntries);
  }
}
