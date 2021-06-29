import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ArrayBehaviorState } from '@vitagroup/common';
import { NavEntry } from './nav-entry';

/** Optionally provides the initial set of {@link NavEntry}s that's pushed to the {@link NavEntryState} state */
export const NAV_ENTRIES = new InjectionToken<NavEntry[]>('NAV_ENTRIES');

@Injectable({ providedIn: 'root' })
export class NavEntryState extends ArrayBehaviorState<NavEntry> {
  constructor(@Optional() @Inject(NAV_ENTRIES) readonly initialEntries?: /* @dynamic */ NavEntry[]) {
    super();
    // check whether there are initial entries provided and properly "emit" them to the state base impl
    if (initialEntries != null) this.reset(...initialEntries);
  }
}
