import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import foo from './example1';

@Component({
  selector: 'pds-app-alert-example1',
  templateUrl: `./example1.html`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertExample1Component {
  foo = foo;
}
