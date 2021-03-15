import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Inject,
  InjectionToken,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

/** @internal */
export const ENCAPSULATE_TEMPLATE = new InjectionToken<TemplateRef<any>>('ENCAPSULATE_TEMPLATE');

@Directive({ selector: '[encapsulateTemplateOutlet]' })
export class TemplateEncapsulateOutlet implements OnDestroy {
  protected embeddedView: EmbeddedViewRef<any>;

  constructor(
    @Inject(ENCAPSULATE_TEMPLATE)
    protected template: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {
    this.embeddedView = this.viewContainer.createEmbeddedView(this.template);
  }

  protected destroyEmbeddedView(): void {
    if (this.embeddedView != null && !this.embeddedView.destroyed) this.embeddedView.destroy();
  }

  ngOnDestroy() {
    this.destroyEmbeddedView();
  }
}
