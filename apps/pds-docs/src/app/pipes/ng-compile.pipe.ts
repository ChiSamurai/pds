import {
  Compiler,
  COMPILER_OPTIONS,
  CompilerFactory,
  CompilerOptions,
  Component,
  NgModule,
  Pipe,
  PipeTransform,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

export interface NgCompileOptions extends Partial<Pick<NgModule, 'imports' | 'providers' | 'schemas'>> {
  context?: any;
}

@Pipe({ name: 'ngCompile' })
export class NgCompilePipe implements PipeTransform {
  constructor(protected viewContainer: ViewContainerRef, protected compiler: Compiler) {}

  transform(template: string, options?: NgCompileOptions): any {
    this.compiler.clearCache();

    const { context, ...ngModule } = options || {};

    const component = Component({ template })(context || class {});
    const module = NgModule({
      ...ngModule,
      declarations: [component],
    })(class {});

    this.compiler.compileModuleAndAllComponentsAsync(module).then((factories) => {
      const componentFactory = factories.componentFactories[0];
      const componentRef = this.viewContainer.createComponent(componentFactory);
      componentRef.changeDetectorRef.detectChanges();
    });
  }
}

export function createJitCompiler(factory: CompilerFactory): Compiler {
  return factory.createCompiler();
}

@NgModule({
  declarations: [NgCompilePipe],
  exports: [NgCompilePipe],
  providers: [
    {
      provide: COMPILER_OPTIONS,
      useValue: { defaultEncapsulation: ViewEncapsulation.None } as CompilerOptions,
      multi: true,
    },
    {
      provide: CompilerFactory,
      useClass: JitCompilerFactory,
      deps: [COMPILER_OPTIONS],
    },
    {
      provide: Compiler,
      useFactory: createJitCompiler,
      deps: [CompilerFactory],
    },
  ],
})
export class NgCompilePipeModule {}
