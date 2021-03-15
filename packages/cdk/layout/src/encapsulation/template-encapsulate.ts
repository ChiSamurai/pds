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
import { assertMultiProvider, TemplateOutlet } from '@vitagroup/common';
import { ENCAPSULATE_TEMPLATE } from './template-encapsulate-outlet';
import { TEMPLATE_ENCAPSULATIONS, TemplateEncapsulation } from './template-encapsulation';

export function resolveEncapsulateTemplate(dir: TemplateEncapsulate): TemplateRef<any> {
  return dir.template;
}

@Directive({
  selector: '[encapsulate]',
  exportAs: 'encapsulate',
  inputs: ['ngClass: encapsulateNgClass', 'ngStyle: encapsulateNgStyle'],
  providers: [
    {
      // the ENCAPSULATE_TEMPLATE is provided additionally here to also properly
      // support any `*encapsulateTemplateOutlet` usages inside the given template
      provide: ENCAPSULATE_TEMPLATE,
      useFactory: resolveEncapsulateTemplate,
      deps: [TemplateEncapsulate],
    },
  ],
})
export class TemplateEncapsulate extends TemplateOutlet implements OnChanges, OnDestroy {
  protected readonly injector: Injector;
  protected container: ComponentRef<any> | EmbeddedViewRef<any>;

  @Input('encapsulate') encapsulationName: string;

  context: never;

  get encapsulation(): TemplateEncapsulation | null {
    return this.encapsulations?.find((te) => te.name === this.encapsulationName);
  }

  protected get containerFactory(): ComponentFactory<any> | null {
    if (this.encapsulation?.container instanceof TemplateRef) return;
    else return this.factoryResolver.resolveComponentFactory(this.encapsulation.container);
  }

  constructor(
    injector: Injector,
    readonly template: TemplateRef<any>,
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
    // create a local injector instance holding the ENCAPSULATE_TEMPLATE reference
    this.injector = Injector.create({
      parent: injector,
      providers: [{ provide: ENCAPSULATE_TEMPLATE, useValue: template }],
    });
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

  ngOnChanges(changes: SimpleChanges) {
    const shouldRecreate =
      'encapsulationName' in changes &&
      changes.encapsulationName.previousValue !== changes.encapsulationName.currentValue;

    if (this.encapsulation != null && shouldRecreate) {
      this.destroyContainer();

      let rootNodes: any[];
      if (this.encapsulation.container instanceof TemplateRef) {
        this.container = this.viewContainerRef.createEmbeddedView(this.encapsulation.container);
        rootNodes = this.container.rootNodes;
      } else {
        this.container = this.viewContainerRef.createComponent(this.containerFactory, null, this.injector);
        rootNodes = [this.container.location.nativeElement];
      }
      this.updateNgClasses(rootNodes);
      this.updateNgStyles(rootNodes);
    } else super.ngOnChanges(changes);
  }
  ngOnDestroy() {
    this.destroyContainer();
  }
}
