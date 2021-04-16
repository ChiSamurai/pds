import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  Inject,
  Injector,
  Input,
  IterableDiffers,
  KeyValueDiffers,
  OnChanges,
  OnDestroy,
  Optional,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentProps } from '@vitagroup/cdk';
import { assertMultiProvider, TemplateOutlet } from '@vitagroup/common';
import { TEMPLATE_ENCAPSULATIONS, TemplateEncapsulation } from './template-encapsulation';

@Directive({
  selector: '[encapsulate]',
  exportAs: 'encapsulate',
  inputs: ['ngClass: encapsulateNgClass', 'ngStyle: encapsulateNgStyle'],
})
export class TemplateEncapsulate extends TemplateOutlet implements OnChanges, OnDestroy {
  protected containerRef: ComponentRef<any>;

  @Input('encapsulate') encapsulationName: string;

  context: never;

  get encapsulation(): TemplateEncapsulation | null {
    return this.encapsulations?.find((te) => te.name === this.encapsulationName);
  }

  protected get containerFactory(): ComponentFactory<any> | null {
    return this.encapsulation && this.factoryResolver.resolveComponentFactory(this.encapsulation.container);
  }

  constructor(
    readonly template: TemplateRef<any>,
    protected injector: Injector,
    protected renderer: Renderer2,
    protected viewContainerRef: ViewContainerRef,
    protected factoryResolver: ComponentFactoryResolver,
    protected iterableDiffers: IterableDiffers,
    protected keyValueDiffers: KeyValueDiffers,
    @Optional()
    @Inject(TEMPLATE_ENCAPSULATIONS)
    protected encapsulations: /* @dynamic */ TemplateEncapsulation[]
  ) {
    super(renderer, iterableDiffers, keyValueDiffers, viewContainerRef);

    assertMultiProvider(encapsulations, TEMPLATE_ENCAPSULATIONS.toString());
  }

  ngOnChanges(changes: SimpleChanges) {
    const { encapsulationName } = changes;

    const shouldRecreate =
      encapsulationName?.firstChange || encapsulationName?.previousValue !== encapsulationName?.currentValue;

    if (shouldRecreate) {
      const viewRef = this.viewContainerRef.createEmbeddedView(this.template);
      this.setViewRef(viewRef);

      if (this.encapsulation != null) {
        this.containerRef?.destroy();
        this.containerRef = this.viewContainerRef.createComponent(this.containerFactory, null, this.injector, [
          viewRef.rootNodes,
        ]);

        const rootNodes = [this.containerRef.location.nativeElement];
        this.updateNgClasses(rootNodes);
        this.updateNgStyles(rootNodes);
      }
    }
  }
  ngOnDestroy() {
    super.ngOnDestroy();

    this.containerRef?.destroy();
  }
}
