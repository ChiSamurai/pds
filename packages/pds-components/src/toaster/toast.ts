import { Component } from '@angular/core';
import { ToastRef } from '@vitagroup/cdk';

@Component({
  selector: 'pds-toast',
  styles: [':host { display: block }'],
  template: `
    <ng-container *ngIf="toastRef.templateRef; else builtInToastTemplate">
      <ng-container
        *ngTemplateOutlet="toastRef.templateRef; context: { $implicit: toastRef.message, toast: toastRef }"
      ></ng-container>
    </ng-container>
    <ng-template #builtInToastTemplate>
      <pds-banner class="{{ toastRef.type }}">
        <svg-icon *ngIf="toastRef.data?.iconName" [name]="toastRef.data.iconName" pdsBefore></svg-icon>
        <span>{{ toastRef.message }}</span>
      </pds-banner>
    </ng-template>
  `,
})
export class PdsToast {
  constructor(readonly toastRef: ToastRef) {}
}
