import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { SelectionOptions } from './selection-model';
import { SELECTION_VALUE, SelectionValue } from './selection-value';

@Directive()
export abstract class SelectionTrigger<T = any> implements OnInit, OnChanges, OnDestroy {
  private _isDisabled = false;
  private _detachTriggerEventListener: () => void;
  private _event: Event | null;

  triggerEvent = 'click';
  options: SelectionOptions | null;

  set isDisabled(value: boolean) {
    this._isDisabled = coerceBooleanProperty(value);
  }
  get isDisabled(): boolean {
    return this._isDisabled || this.value.isDisabled;
  }

  /** Gets the {@link Event} for the latest trigger event name callback on the host {@link ElementRef} */
  protected get event(): Event | null {
    return this._event;
  }

  constructor(
    @Inject(SELECTION_VALUE) readonly value: SelectionValue<T>,
    @Inject(ElementRef) protected elementRef: ElementRef,
    @Inject(Renderer2) protected renderer: Renderer2
  ) {}

  abstract trigger(options?: SelectionOptions): void;

  ngOnInit(): void {
    this.checkTriggerEventListener();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('triggerEvent' in changes) this.checkTriggerEventListener();
  }
  ngOnDestroy(): void {
    this.detachTriggerEventListener();
  }

  protected checkTriggerEventListener(): void {
    this.detachTriggerEventListener();
    if (this.triggerEvent != null) {
      this.detachTriggerEventListener = this.renderer.listen(
        this.elementRef.nativeElement,
        this.triggerEvent,
        (event) => {
          this._event = event;
          if (!this.isDisabled) this.trigger(this.options);
        }
      );
    }
  }
  protected detachTriggerEventListener(): void {
    if (this._detachTriggerEventListener != null) {
      this._detachTriggerEventListener();
    }
  }
}
