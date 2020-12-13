import { Directive, DoCheck, ElementRef, Input, NgModule, OnDestroy, OnInit, Renderer2, RendererStyleFlags2 } from '@angular/core';

@Directive({ selector: '[preventScrollbarOffset]' })
export class PreventNativeScrollbarOffset implements OnInit, DoCheck, OnDestroy {
  @Input('preventScrollbarOffset') scrollContainer: ElementRef | HTMLElement = this.elementRef;

  constructor(
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.apply();
  }
  ngDoCheck(): void {
    this.apply();
  }
  ngOnDestroy(): void {
    this.reset();
  }

  getScrollbarWidth(): number {
    const container: HTMLElement = this.scrollContainer instanceof ElementRef
      ? this.scrollContainer.nativeElement
      : this.scrollContainer;
    const { offsetWidth, clientWidth } = container;
    return offsetWidth - clientWidth;
  }

  reset(): void {
    const { nativeElement } = this.elementRef;
    this.renderer.removeStyle(nativeElement, 'position');
    this.renderer.removeStyle(nativeElement, 'left');
  }
  apply(): void {
    const { nativeElement } = this.elementRef;
    this.renderer.setStyle(nativeElement, 'position', 'relative', RendererStyleFlags2.Important);
    this.renderer.setStyle(nativeElement, 'left', `${this.getScrollbarWidth() / 2}px`, RendererStyleFlags2.Important);
  }

}

@NgModule({
  declarations: [ PreventNativeScrollbarOffset ],
  exports: [ PreventNativeScrollbarOffset ]
})
export class PreventNativeScrollbarOffsetModule {
}
