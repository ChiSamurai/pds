import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoadingState } from './loading-state';

export const LOADING_INDICATOR_COMPONENT = new InjectionToken<Type<any>>('LOADING_INDICATOR_COMPONENT');

@Directive({ selector: '[loadingIndicatorOutlet], loading-indicator' })
export class LoadingIndicatorOutlet implements OnInit, OnDestroy {
  private _componentRef: ComponentRef<any>;

  protected readonly ngDestroys = new Subject<void>();
  protected readonly componentFactory: ComponentFactory<any>;

  constructor(
    readonly state: LoadingState,
    @Inject(LOADING_INDICATOR_COMPONENT)
    protected readonly componentType: Type<any>,
    protected viewContainerRef: ViewContainerRef,
    factoryResolver: ComponentFactoryResolver
  ) {
    this.componentFactory = factoryResolver.resolveComponentFactory(componentType);
  }

  ngOnInit() {
    this.state.starts.pipe(takeUntil(this.ngDestroys))
      .subscribe(() => this.insert());
    this.state.stops.pipe(takeUntil(this.ngDestroys))
      .subscribe(() => this.clear());
  }
  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }

  insert(): void {
    this._componentRef = this.viewContainerRef.createComponent(this.componentFactory);
    this._componentRef.changeDetectorRef.markForCheck();
  }
  clear(): void {
    this._componentRef.destroy();
  }
}
