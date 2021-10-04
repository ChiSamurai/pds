import { Directive, Input } from '@angular/core';
import { NavEntry } from './nav-entry';
import { NavEntryContainer } from './nav-entry-container';
import { NavEntryState } from './nav-entry-state';

@Directive()
export abstract class NavBase extends NavEntryContainer {
  @Input()
  set entries(value: NavEntry[]) {
    this.state.reset(...value);
  }
  get entries(): NavEntry[] {
    return this.state.snapshot;
  }

  constructor(readonly state: NavEntryState) {
    super();
  }
}
