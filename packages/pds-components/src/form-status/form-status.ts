import { Component, HostBinding, Inject, Optional, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FORM_ERROR_MESSAGE, FORM_PENDING_TEMPLATE, FORM_VALID_TEMPLATE } from '@vitagroup/cdk/forms';

@Component({
  selector: 'pds-form-status',
  styleUrls: ['./form-status.scss'],
  encapsulation: ViewEncapsulation.None,
  /* eslint-disable max-len */
  template: `
    <ng-container [ngSwitch]="true">
      <ng-container *ngSwitchCase="errorMessage != null">
        <svg-icon name="pds-form-status-error" viewBox="0 0 512 512">
          <svg:path
            d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
          />
        </svg-icon>
        <div>
          {{ errorMessage }}
        </div>
      </ng-container>

      <ng-container *ngSwitchCase="pendingTemplate != null">
        <pds-ring-loader size="14px" width="8"></pds-ring-loader>
        <div>
          <ng-container *ngTemplateOutlet="pendingTemplate"></ng-container>
        </div>
      </ng-container>

      <ng-container *ngSwitchCase="validTemplate != null">
        <svg-icon name="pds-form-status-valid" viewBox="0 0 448 512">
          <svg:path
            d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"
          />
        </svg-icon>
        <ng-container *ngTemplateOutlet="validTemplate"></ng-container>
      </ng-container>
    </ng-container>
  `,
  /* eslint-enable max-len */
})
export class FormStatus {
  @HostBinding('class.error') get isError(): boolean {
    return this.errorMessage != null;
  }
  @HostBinding('class.pending') get isPending(): boolean {
    return this.pendingTemplate != null;
  }
  @HostBinding('class.valid') get isValid(): boolean {
    return this.validTemplate != null;
  }

  constructor(
    @Optional() @Inject(FORM_ERROR_MESSAGE) readonly errorMessage?: string,
    @Optional() @Inject(FORM_PENDING_TEMPLATE) readonly pendingTemplate?: TemplateRef<any>,
    @Optional() @Inject(FORM_VALID_TEMPLATE) readonly validTemplate?: TemplateRef<any>
  ) {}
}
