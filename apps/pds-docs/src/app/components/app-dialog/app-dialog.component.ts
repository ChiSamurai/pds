import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { DialogOverlayModule } from '@vitagroup/cdk';
import { AlertModule, PdsModalModule } from '@vitagroup/pds-components';

@Component({
  selector: 'pds-app-dialog',
  styles: ['pds-app-dialog { display: block }'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <pds-modal fullscreen="false">
      <pds-modal-header>
        <h4>Cookie Notice</h4>
      </pds-modal-header>

      <pds-modal-content>
        <pds-alert>We are using cookies to maintain and improve the quality of our service.</pds-alert>
      </pds-modal-content>

      <pds-modal-footer>
        <button class="secondary" dialogDispose>Close</button>
        <button>Accept</button>
      </pds-modal-footer>
    </pds-modal>
  `,
})
export class AppDialogComponent {}

@NgModule({
  declarations: [AppDialogComponent],
  exports: [AppDialogComponent],
  imports: [PdsModalModule, DialogOverlayModule, AlertModule],
})
export class AppDialogComponentModule {}
