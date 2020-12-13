import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { ArrayBehaviorState } from '@vitagroup/common';
import { NavigationEntry } from './navigation-entry';

/** Optionally provides the initial set of {@link MainMenuEntry}s that's pushed to the {@link NavigationList.entryState} state */
export const NAVIGATION_ENTRIES = new InjectionToken<NavigationEntry[]>('NAVIGATION_ENTRIES');

@Injectable({ providedIn: 'root' })
export class NavigationEntries extends ArrayBehaviorState<NavigationEntry> {
  constructor(@Optional() @Inject(NAVIGATION_ENTRIES) initialEntries?: /* @dynamic */ NavigationEntry[]) {
    super();
    // check whether there are initial entries provided and properly "emit" them to the state base impl
    if (initialEntries != null) this.reset(...initialEntries);
  }
}
