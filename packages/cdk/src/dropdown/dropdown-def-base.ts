import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  Inject,
  OnDestroy,
  Optional,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ElementFocusAccessor, ElementFocusState } from '../element-state/element-focus-state';
import { ControlInputAccessor, INPUT_ACCESSOR } from '../input-dropdown/control-input-accessor';
import { OverlayDefBase } from '../overlay/overlay-def-base';
import { SelectionModel } from '../selection/selection-model';

export type DropdownPositionY = 'top' | 'bottom';
export type DropdownPositionX = 'start' | 'end';

export type DropdownPosition = [DropdownPositionX, DropdownPositionY];

@Directive()
export abstract class DropdownDefBase
  extends OverlayDefBase
  implements AfterContentInit, OnDestroy, ElementFocusAccessor {
  @ContentChild(SelectionModel)
  private readonly _contentSelectionModel: SelectionModel | null;
  private readonly _selectionModel: SelectionModel;

  @ContentChildren(ElementFocusState, { descendants: true })
  protected readonly contentFocusStates: QueryList<ElementFocusState>;

  protected readonly ngDestroys = new Subject();
  readonly ngAfterContentInits = new Subject();

  get selectionModel(): SelectionModel {
    return this._selectionModel || this._contentSelectionModel;
  }

  get focus(): ElementFocusState | null {
    return this.contentFocusStates?.first;
  }

  preferredPosition: DropdownPosition = ['start', 'bottom'];

  constructor(
    template: TemplateRef<any>,
    @Optional() @Inject(INPUT_ACCESSOR) readonly inputAccessor?: /* @dynamic */ ControlInputAccessor,
    @Optional() selectionModel?: SelectionModel
  ) {
    super(template);

    if (selectionModel != null) this._selectionModel = selectionModel;
  }

  ngAfterContentInit() {
    this.ngAfterContentInits.next();
  }
  ngOnDestroy() {
    this.ngAfterContentInits.complete();
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
