import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { EventUnlistener } from '@vitagroup/common';
import { SelectionModel } from '../selection/selection-model';
import { SelectionValue } from '../selection/selection-value';

@Directive()
export abstract class SelectOptionBase<T, E = any> extends SelectionValue<T> implements OnInit, OnDestroy {
  private _unlistenClick: EventUnlistener;

  @Input() disabled: boolean;
  @Input() value: T;

  get nativeElement(): E {
    return this.elementRef.nativeElement;
  }

  constructor(
    protected selectionModel: SelectionModel<T>,
    protected elementRef: ElementRef<E>,
    protected renderer: Renderer2
  ) {
    super(selectionModel);
  }

  protected onClick(e: Event): void {
    this.toggle();
  }

  ngOnInit() {
    this._unlistenClick = this.renderer.listen(this.elementRef.nativeElement, 'click', this.onClick.bind(this));
  }
  ngOnDestroy() {
    this._unlistenClick();
  }
}
