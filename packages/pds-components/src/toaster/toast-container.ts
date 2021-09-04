import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ToastContainer, ToastRef } from '@vitagroup/cdk';
import { ArrayBehaviorState } from '@vitagroup/common';

@Component({
  selector: 'pds-toaster',
  styleUrls: ['toast-container.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngFor="let toast of queue.asObservable() | async">
      <ng-container *ngComponentOutlet="toast.componentType; injector: toast.injector"></ng-container>
    </ng-container>
  `,
})
export class PdsToastContainer implements ToastContainer {
  readonly queue = new ArrayBehaviorState<ToastRef>();
}
