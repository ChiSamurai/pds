import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Inject,
  InjectionToken, OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

/** @internal */
export const ENCAPSULATE_TEMPLATE = new InjectionToken<TemplateRef<any>>('ENCAPSULATE_TEMPLATE');

@Directive({ selector: '[encapsulateTemplateOutlet]' })
export class TemplateEncapsulateOutlet implements DoCheck, OnDestroy {
  protected embeddedView: EmbeddedViewRef<any>;

  constructor(
    @Inject(ENCAPSULATE_TEMPLATE)
    protected template: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {
  }

  protected destroyEmbeddedView(): void {
    if (this.embeddedView != null && !this.embeddedView.destroyed)
      this.embeddedView.destroy();
  }

  ngDoCheck() {
    this.destroyEmbeddedView();
    this.embeddedView = this.viewContainer.createEmbeddedView(this.template);
    this.embeddedView.detectChanges();
  }
  ngOnDestroy() {
    this.destroyEmbeddedView();
  }
}
