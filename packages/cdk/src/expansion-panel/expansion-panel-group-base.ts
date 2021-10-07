import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ContentChildren, Directive, Input, OnDestroy, QueryList } from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { mapTo, takeUntil } from 'rxjs/operators';
import { ExpansionPanelBase } from './expansion-panel-base';

export function connectExpansionPanels(panels: ExpansionPanelBase[], group?: ExpansionPanelGroupBase): Subscription {
  const anyExpand = merge(...panels.map((panel) => panel.expands.pipe(mapTo(panel))));
  return anyExpand.subscribe((panel) => {
    for (const panel1 of panels.filter((panel2) => panel2 !== panel)) {
      if (group == null || !group.allowsMultiple) panel1.collapse();
    }
  });
}

@Directive()
export class ExpansionPanelGroupBase implements AfterContentInit, OnDestroy {
  private _anyExpandSubscription: Subscription;
  private _allowsMultiple = true;

  @ContentChildren(ExpansionPanelBase, { descendants: true })
  protected readonly descendantPanels: QueryList<ExpansionPanelBase>;
  protected readonly ngDestroys = new Subject();

  @Input('multiple')
  set allowsMultiple(value: boolean) {
    this._allowsMultiple = coerceBooleanProperty(value);
  }
  get allowsMultiple(): boolean {
    return this._allowsMultiple;
  }

  get children(): ExpansionPanelBase[] {
    return this.descendantPanels?.toArray() || [];
  }

  expandAll(): void {
    this._all((panel) => panel.expand());
  }
  collapseAll(): void {
    this._all((panel) => panel.collapse());
  }
  toggleAll(): void {
    this._all((panel) => panel.toggle());
  }

  invalidateConnection(panels?: ExpansionPanelBase[]): void {
    if (this._anyExpandSubscription != null && !this._anyExpandSubscription.closed)
      this._anyExpandSubscription.unsubscribe();

    this._anyExpandSubscription = connectExpansionPanels(panels || this.descendantPanels.toArray(), this);
  }

  ngAfterContentInit() {
    this.invalidateConnection();
    this.descendantPanels.changes.pipe(takeUntil(this.ngDestroys)).subscribe(() => this.invalidateConnection());
  }
  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }

  private _all(operation: (panel: ExpansionPanelBase) => unknown): void {
    for (const panel of this.descendantPanels?.toArray() || []) operation(panel);
  }
}
