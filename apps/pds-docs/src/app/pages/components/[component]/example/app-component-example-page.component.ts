import { AfterViewInit, Compiler, Component, NgModule, ViewChild, ViewContainerRef } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';
import { PdsAlertModule } from '@vitagroup/pds-components';

@Component({
  selector: 'pds-app-component-example-page',
  styles: [':host { display: block }'],
  template: `
    <div #exampleContainer></div>
  `,
})
export class AppComponentExamplePageComponent implements AfterViewInit {
  @ViewChild('exampleContainer', { read: ViewContainerRef })
  protected exampleViewContainer: ViewContainerRef;

  constructor(protected compiler: Compiler) {}

  ngAfterViewInit() {
    this.compiler.clearCache();

    const component = Component({
      template: `
        <pds-alert class="info">
          <span pdsBefore>🎉</span>
          <span>Wait, <strong>this</strong> is actually compiled during runtime. <strong>Fabulous</strong></span>
        </pds-alert>
        <br>
        <pds-alert class="warning">
          <svg-icon name="exclamation-triangle" pdsBefore></svg-icon>
          <span>This section is still in progress btw</span>
          <span pdsAfter>😉</span>
        </pds-alert>
      `,
    })(class {});

    const module = NgModule({
      declarations: [component],
      imports: [PdsAlertModule, SvgIconModule],
    })(class {});

    this.compiler.compileModuleAndAllComponentsAsync(module).then((factories) => {
      const componentFactory = factories.componentFactories[0];
      const componentRef = this.exampleViewContainer.createComponent(componentFactory);
      componentRef.changeDetectorRef.detectChanges();
    });
  }
}
