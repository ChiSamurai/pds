import { CdkScrollable } from '@angular/cdk/overlay';
import {
  Directive,
  ElementRef,
  NgModule,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';

@Directive({ selector: '[preventNativeScrollbarOffset]' })
export class PreventNativeScrollbarOffset implements OnInit, OnDestroy {
  protected scrollContainer: ElementRef = this.elementRef;

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2, @Optional() scrollable: CdkScrollable) {
    if (scrollable != null) this.scrollContainer = scrollable.getElementRef();
  }

  ngOnInit(): void {
    this.apply();
  }
  ngOnDestroy(): void {
    this.reset();
  }

  getScrollbarWidth(): number {
    // todo: platform independence?!
    const { offsetWidth, clientWidth } = this.scrollContainer.nativeElement as HTMLElement;
    return offsetWidth - clientWidth;
  }

  reset(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'margin-left');
  }
  apply(): void {
    const scrollbarWidth = this.getScrollbarWidth();

    if (scrollbarWidth > 0) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'margin-left',
        `${scrollbarWidth}px`,
        RendererStyleFlags2.Important
      );
    }
  }
}

@NgModule({
  declarations: [PreventNativeScrollbarOffset],
  exports: [PreventNativeScrollbarOffset],
})
export class PreventNativeScrollbarOffsetModule {}
