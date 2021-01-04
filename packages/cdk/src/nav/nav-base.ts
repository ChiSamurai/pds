import { Directive, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { NavigationEntries } from '../navigation/navigation-entries';
import { NavigationEntry } from '../navigation/navigation-entry';
import { NavigationEntryContainer } from '../navigation/navigation-entry-container';

/**
 * Holds a reference to the static {@link NavigationEntry}s that are displayed in a separate
 * region of the `nav-menu` instance
 */
export const STATIC_NAVIGATION_ENTRIES = new InjectionToken<NavigationEntry[]>('STATIC_NAVIGATION_ENTRIES');

@Directive()
export class NavBase extends NavigationEntryContainer {
  readonly staticState = new NavigationEntries();

  @Input()
  set entries(value: NavigationEntry[]) {
    this.state.reset(...value);
  }
  get entries(): NavigationEntry[] {
    return this.state.snapshot;
  }

  @Input()
  set staticEntries(value: NavigationEntry[]) {
    this.staticState.reset(...value);
  }
  get staticEntries(): NavigationEntry[] {
    return this.staticState.snapshot;
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
