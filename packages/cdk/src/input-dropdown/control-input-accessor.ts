import { Directive, ElementRef, InjectionToken, NgModule, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { EventUnlistener, PrimitiveBehaviorState } from '@vitagroup/common';
import { Subject } from 'rxjs';

export interface ControlInputAccessor {
  /** Gets a subject that emits whenever a user types within a control */
  readonly input: PrimitiveBehaviorState<string>;
}

export const INPUT_ACCESSOR = new InjectionToken<ControlInputAccessor>('INPUT_ACCESSOR');

@Directive({
  selector: 'input:not([type=checkbox]):not([type=radio]), textarea',
  providers: [{ provide: INPUT_ACCESSOR, useExisting: DefaultControlInputAccessor }],
})
export class DefaultControlInputAccessor implements ControlInputAccessor, OnInit, OnDestroy {
  protected unlistenInput: EventUnlistener;

  readonly input = new PrimitiveBehaviorState<string>();

  constructor(readonly element: ElementRef, protected renderer: Renderer2) {}

  protected onInput(e: Event): void {
    this.input.patch((e.target as any).value);
  }

  ngOnInit() {
    this.unlistenInput = this.renderer.listen(this.element.nativeElement, 'input', (e) => this.onInput(e));
  }
  ngOnDestroy() {
    this.unlistenInput?.();
  }
}

@NgModule({
  declarations: [DefaultControlInputAccessor],
  exports: [DefaultControlInputAccessor],
})
export class DefaultControlInputAccessorModule {}
