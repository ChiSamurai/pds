import { Directive, ElementRef, HostListener, Input, NgModule, Renderer2 } from '@angular/core';

const TITLE_ATTR = 'title';

@Directive({ selector: '[preventNativeTitleTooltip]' })
export class PreventNativeTitleTooltip {
  @Input() title: string;

  get hasTitleAttribute(): boolean {
    return !!this.elementRef.nativeElement.title;
  }

  constructor(
    protected elementRef: ElementRef,
    protected renderer: Renderer2
  ) {
  }

  @HostListener('mouseover')
  protected removeTitleAttribute(): void {
    if (this.hasTitleAttribute)
      this.renderer.removeAttribute(this.elementRef.nativeElement, TITLE_ATTR);
  }
  @HostListener('mouseout')
  protected restoreTitleAttribute(): void {
    if (!this.hasTitleAttribute)
      this.renderer.setAttribute(this.elementRef.nativeElement, TITLE_ATTR, this.title);
  }
}

@NgModule({
  declarations: [ PreventNativeTitleTooltip ],
  exports: [ PreventNativeTitleTooltip ]
})
export class PreventNativeTitleTooltipModule {
}
