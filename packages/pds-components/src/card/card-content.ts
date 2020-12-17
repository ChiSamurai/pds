import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-card-header',
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content></ng-content>`
})
export class CardHeader {
}

@Component({
  selector: 'pds-card-footer',
  encapsulation: ViewEncapsulation.None,
  template: `<ng-content></ng-content>`
})
export class CardFooter {
}
