import { Directive, ElementRef, Input, NgModule, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { EventUnlistener } from '@vitagroup/common';

const TITLE_ATTR = 'title';

@Directive({ selector: '[preventNativeTitleTooltip]' })
export class PreventNativeTitleTooltip implements OnInit, OnDestroy {
  private _unlistener: EventUnlistener[];

  @Input() title: string;

  get hasTitleAttribute(): boolean {
    return !!this.elementRef.nativeElement.title;
  }

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}

  protected removeTitleAttribute(): void {
    if (this.hasTitleAttribute) this.renderer.removeAttribute(this.elementRef.nativeElement, TITLE_ATTR);
  }
  protected restoreTitleAttribute(): void {
    if (!this.hasTitleAttribute) this.renderer.setAttribute(this.elementRef.nativeElement, TITLE_ATTR, this.title);
  }

  ngOnInit() {
    const { nativeElement } = this.elementRef;
    this._unlistener = [
      this.renderer.listen(nativeElement, 'mouseenter', () => this.removeTitleAttribute()),
      this.renderer.listen(nativeElement, 'mouseleave', () => this.restoreTitleAttribute()),
    ];
  }
  ngOnDestroy() {
    if (this._unlistener?.length > 0) {
      for (const unlisten of this._unlistener) unlisten();
      this._unlistener = null;
    }
  }
}

@NgModule({
  declarations: [PreventNativeTitleTooltip],
  exports: [PreventNativeTitleTooltip],
})
export class PreventNativeTitleTooltipModule {}
