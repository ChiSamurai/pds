import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  EventEmitter,
  ChangeDetectorRef,
  inject,
  NgZone,
} from '@angular/core';
import { EventUnlistener } from '@vitagroup/common';
import { Subject } from 'rxjs';
import { ElementActiveState, ElementDisabledState, ElementFocusState, ElementReadOnlyState } from '../element-state';
import { ControlValueAccessorBase } from '../utils';

@Directive()
export abstract class TextBoxBase<T = any> extends ControlValueAccessorBase<T> implements OnDestroy {
  protected readonly inputRef: ElementRef<HTMLInputElement> | null;
  protected readonly ngDestroys = new Subject<void>();

  private _unlistener: EventUnlistener[] = [];
  private _value: T;

  readonly active = new ElementActiveState(this.elementRef, this.renderer);
  readonly focus = new ElementFocusState(this.elementRef, this.renderer);
  readonly readOnly = new ElementReadOnlyState(this.elementRef, this.renderer);
  readonly disabled = new ElementDisabledState(this.elementRef, this.renderer);

  @Input() placeholder?: string;

  @Input()
  set value(value: T) {
    this.setValue(value);
  }
  get value(): T {
    return this._value;
  }

  @Output() readonly valueChange = new EventEmitter<T>();

  constructor(
    protected elementRef: ElementRef,
    protected changeDetectorRef: ChangeDetectorRef,
    protected renderer: Renderer2
  ) {
    super();
  }

  protected listenUntilDestroyed(target: ElementRef | any, eventName: string, listener: EventListener): void {
    if (target instanceof ElementRef) target = target.nativeElement;
    this._unlistener.push(this.renderer.listen(target, eventName, listener));
  }

  protected setValue(value: T): void {
    this.changeControlValue(value);
    this._value = value;
  }

  writeValue(obj: any) {
    this._value = obj;
    this.valueChange.emit(this._value);
  }

  ngOnDestroy() {
    for (const unlisten of this._unlistener) unlisten();
    this._unlistener = [];

    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
