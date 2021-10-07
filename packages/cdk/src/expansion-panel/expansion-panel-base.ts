import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, Output } from '@angular/core';
import { PrimitiveBehaviorState } from '@vitagroup/common';
import { filter } from 'rxjs/operators';

@Directive()
export abstract class ExpansionPanelBase {
  protected readonly expansionState = new PrimitiveBehaviorState<boolean>(false);

  @Input('expanded')
  set isExpanded(value: boolean) {
    this.expansionState.patch(coerceBooleanProperty(value));
  }
  get isExpanded(): boolean {
    return this.expansionState.snapshot;
  }

  @Output() readonly changes = this.expansionState.asObservable();
  @Output() readonly collapses = this.changes.pipe(filter((value) => !value));
  @Output() readonly expands = this.changes.pipe(filter((value) => !!value));

  expand(): void {
    this.isExpanded = true;
  }
  collapse(): void {
    this.isExpanded = false;
  }
  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
}
