import {
  Compiler,
  COMPILER_OPTIONS,
  CompilerFactory,
  CompilerOptions,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { RouterModule, Routes } from '@angular/router';
import { AppComponentExamplePageComponent } from './app-component-example-page.component';

export const APP_COMPONENT_EXAMPLE_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: AppComponentExamplePageComponent,
  },
];

export function createJitCompiler(factory: CompilerFactory): Compiler {
  return factory.createCompiler();
}

@NgModule({
  declarations: [AppComponentExamplePageComponent],
  imports: [RouterModule.forChild(APP_COMPONENT_EXAMPLE_PAGE_ROUTES)],
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
export class AppComponentExamplePageModule {}
