import { Compiler, Component } from '@angular/core';

@Component({
  selector: 'pds-app-component-example-page',
  styles: [':host { display: block }'],
  template: ``,
})
export class AppComponentExamplePageComponent {
  constructor(protected compiler: Compiler) {
    console.log(compiler);
  }
}
