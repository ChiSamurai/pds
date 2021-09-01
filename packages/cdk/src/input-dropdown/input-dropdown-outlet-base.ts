import { coerceArray } from '@angular/cdk/coercion';
import { Overlay } from '@angular/cdk/overlay';
import {
  Directive,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { WINDOW } from '@ng-web-apis/common';
import { Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { DropdownOutletBase } from '../dropdown/dropdown-outlet-base';
import { ElementFocusState } from '../element-state/element-focus-state';
import { OverlayDeactivateOptions } from '../overlay/overlay-outlet-base';
import { SelectionModel } from '../selection/selection-model';
import { ControlValueAccessorBase } from '../utils/control-value-accessor-base';
import { ControlInputAccessor, INPUT_ACCESSOR } from './control-input-accessor';

export interface InputDropdownDeactivateOptions extends OverlayDeactivateOptions {
  clearInput?: boolean;
}

@Directive()
export abstract class InputDropdownOutletBase extends DropdownOutletBase implements OnInit, OnChanges, OnDestroy {
  private _latestKeyDownEvent: KeyboardEvent | null;

  protected get valueAccessor(): ControlValueAccessor | null {
    return this._valueAccessors?.[this._valueAccessors?.length - 1];
  }

  protected readonly ngChanges = new Subject();

  get selectionModel(): SelectionModel | null {
    return this.overlayDef?.selectionModel;
  }

  constructor(
    protected overlay: Overlay,
    protected viewContainerRef: ViewContainerRef,
    protected renderer: Renderer2,
    @Inject(WINDOW) protected window: /* @dynamic */ Window,
    @Inject(NG_VALUE_ACCESSOR) @Optional() private _valueAccessors?: /* @dynamic */ ControlValueAccessor[] | null,
    @Inject(INPUT_ACCESSOR) @Optional() readonly inputAccessor?: /* @dynamic */ ControlInputAccessor,
    @Optional() focus?: ElementFocusState
  ) {
    super(overlay, viewContainerRef, renderer, focus);
  }

  protected onEscShortcut() {
    if (this.isActive) this.deactivate({ setFocus: true, clearInput: true });
  }

  activate() {
    const { width } = this.window.getComputedStyle(this.viewContainerRef.element.nativeElement);
    this.overlayRef.updateSize({ minWidth: width });

    if (this.overlayDef?.focus.isUnset) this.overlayDef?.focus.set();

    super.activate();
  }
  deactivate(options?: InputDropdownDeactivateOptions) {
    super.deactivate(options);

    if (options?.clearInput) this.inputAccessor.input.patch(null);
  }

  ngOnInit() {
    super.ngOnInit();

    this.preventDefaultDeactivation();

    this.shortcuts.register('arrowdown', (e) => {
      e.preventDefault();
      this.activate();
    });
    this.shortcuts.register('arrowup', (e) => {
      e.preventDefault();
      this.activate();
    });

    this.listenUntilDestroyed('document', 'keydown', (e: KeyboardEvent) => {
      this._latestKeyDownEvent = e;
    });
    this.listenUntilDestroyed('document', 'keyup', () => {
      this._latestKeyDownEvent = null;
    });

    this.focus
      .asObservable()
      .pipe(takeUntil(this.ngDestroys), distinctUntilChanged())
      .subscribe((isFocused) => {
        if (!isFocused) this.deactivate();
      });
    this.inputAccessor?.input
      .asObservable()
      .pipe(takeUntil(this.ngDestroys))
      .subscribe((input) => {
        this.overlayDef?.inputAccessor.input.patch(input);
        if (input) this.activate();
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.ngChanges.next();

    if ('overlayDef' in changes) {
      this.overlayDef?.ngAfterContentInits.pipe(take(1)).subscribe(() => {
        if (this.valueAccessor instanceof ControlValueAccessorBase) {
          const value = this.valueAccessor.getValue();
          this.selectionModel?.reset(value ? coerceArray(value) : []);
        }
        this.valueAccessor?.registerOnChange((value) => {
          this.overlayDef.selectionModel?.reset(coerceArray(value));
        });
        this.selectionModel?.pipe(takeUntil(this.ngChanges)).subscribe((value) => {
          this.valueAccessor.writeValue(value);

          if (this._latestKeyDownEvent?.key?.toLowerCase() === 'enter' && !this._latestKeyDownEvent.shiftKey)
            this.deactivate({ setFocus: true, clearInput: true });
        });
      });
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();

    this.ngChanges.complete();
  }
}
