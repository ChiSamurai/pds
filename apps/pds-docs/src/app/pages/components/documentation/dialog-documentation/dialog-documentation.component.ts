import { Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS } from '../../base-documentation/base-documentation.component';
import { DialogOverlay, DialogOverlayConfig } from '@vitagroup/cdk';
import { AppDialogComponent } from '../../../../components/app-dialog/app-dialog.component';

@Component({
  selector: 'pds-app-dialog-documentation',
  templateUrl: './dialog-documentation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DialogDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  config: DialogOverlayConfig = {
    disposeOnBackdropClick: true
  };

  constructor(protected dialog: DialogOverlay) {
  }

  openDialog() {
    this.dialog.create(AppDialogComponent).subscribe();
  }
}
