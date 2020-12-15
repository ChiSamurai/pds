import { CdkScrollable } from '@angular/cdk/overlay';
import {
  Directive,
  DoCheck,
  ElementRef,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  RendererStyleFlags2
} from '@angular/core';

@Directive({ selector: '[preventNativeScrollbarOffset]' })
export class PreventNativeScrollbarOffset implements OnInit, DoCheck, OnDestroy {
  @Input('preventNativeScrollbarOffset') scrollContainer: ElementRef | HTMLElement = this.elementRef;

  constructor(
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
    @Optional() scrollable: CdkScrollable
  ) {
    if (scrollable != null)
      this.scrollContainer = scrollable.getElementRef();
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
    const scrollbarWidth = this.getScrollbarWidth();

    if (scrollbarWidth > 0) {
      const { nativeElement } = this.elementRef;
      this.renderer.setStyle(nativeElement, 'position', 'relative', RendererStyleFlags2.Important);
      this.renderer.setStyle(nativeElement, 'left', `${scrollbarWidth / 2}px`, RendererStyleFlags2.Important);
    }
  }

}

@NgModule({
  declarations: [ PreventNativeScrollbarOffset ],
  exports: [ PreventNativeScrollbarOffset ]
})
export class PreventNativeScrollbarOffsetModule {
}
