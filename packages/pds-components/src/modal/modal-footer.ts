import { Component, Inject, Input, Optional, ViewEncapsulation } from '@angular/core';
import { MODAL_ENCAPSULATION } from './modal-encapsulation';

@Component({
  selector: 'pds-modal-footer',
  styleUrls: [ './modal-footer.scss' ],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *encapsulate="encapsulation">
      <ng-content></ng-content>
    </ng-container>`
})
export class ModalFooter {
  @Input() encapsulation: string;

  constructor(@Optional() @Inject(MODAL_ENCAPSULATION) encapsulation: string) {
    if (encapsulation != null) this.encapsulation = encapsulation;
  }
}
