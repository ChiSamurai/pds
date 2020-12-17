import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Optional,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { assertMultiProvider } from '@vitagroup/common';
import { ENCAPSULATE_TEMPLATE } from './template-encapsulate-outlet';
import { TEMPLATE_ENCAPSULATIONS, TemplateEncapsulation } from './template-encapsulation';

export function resolveEncapsulateTemplate(dir: TemplateEncapsulate): TemplateRef<any> {
  return dir.template;
}

@Directive({
  selector: '[encapsulate]',
  exportAs: 'encapsulate',
  providers: [
    {
      provide: ENCAPSULATE_TEMPLATE,
      useFactory: resolveEncapsulateTemplate,
      deps: [TemplateEncapsulate],
    },
  ],
})
export class TemplateEncapsulate implements DoCheck, OnDestroy {
  protected container: ComponentRef<any> | EmbeddedViewRef<any>;
  protected embeddedView: EmbeddedViewRef<any>;

  @Input('encapsulate') encapsulationName: string;

  get encapsulation(): TemplateEncapsulation | null {
    return this.encapsulations?.find((te) => te.name === name);
  }

  protected get containerFactory(): ComponentFactory<any> | null {
    if (this.encapsulation?.container instanceof TemplateRef) return;
    else return this.factoryResolver.resolveComponentFactory(this.encapsulation.container);
  }

  constructor(
    readonly template: TemplateRef<any>,
    protected injector: Injector,
    protected viewContainer: ViewContainerRef,
    protected factoryResolver: ComponentFactoryResolver,
    @Optional()
    @Inject(TEMPLATE_ENCAPSULATIONS)
    protected encapsulations: /* @dynamic */ TemplateEncapsulation[]
  ) {
    assertMultiProvider(encapsulations, TEMPLATE_ENCAPSULATIONS.toString());
  }

  protected destroyContainer(): void {
    if (this.container != null) {
      if (
        (this.container instanceof ComponentRef && this.container.hostView.destroyed) ||
        (this.container instanceof EmbeddedViewRef && this.container.destroyed)
      )
        return;
      else this.container.destroy();
    }
  }
  protected destroyEmbeddedView(): void {
    if (this.embeddedView != null && !this.embeddedView.destroyed) this.embeddedView.destroy();
  }

  ngDoCheck() {
    if (this.encapsulation != null) {
      this.destroyContainer();
      this.container =
        this.encapsulation.container instanceof TemplateRef
          ? this.viewContainer.createEmbeddedView(this.encapsulation.container)
          : this.viewContainer.createComponent(this.containerFactory);
    } else {
      this.destroyEmbeddedView();
      this.embeddedView = this.viewContainer.createEmbeddedView(this.template);
    }
  }
  ngOnDestroy() {
    this.destroyContainer();
    this.destroyEmbeddedView();
  }
}
