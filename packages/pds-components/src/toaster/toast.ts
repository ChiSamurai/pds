import { Component, Inject, InjectionToken, Optional } from '@angular/core';
import { BuiltInToastType, SvgIconRegistry, ToastRef } from '@vitagroup/cdk';

export interface PdsBuiltInToastIcon {
  for: BuiltInToastType;
  iconName: string;
}

export const PDS_BUILTIN_TOAST_ICON = new InjectionToken<PdsBuiltInToastIcon>('PDS_BUILTIN_TOAST_ICON');

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
        <svg-icon *ngIf="iconName" [name]="iconName" pdsBefore></svg-icon>
        <span>{{ toastRef.message }}</span>
      </pds-banner>
    </ng-template>
  `,
})
export class PdsToast {
  get iconName(): string {
    if (this.toastRef.data?.iconName) {
      return this.toastRef.data.iconName;
    } else {
      const iconName = this.findBuiltInToastIcon(this.toastRef.type as BuiltInToastType) || this.toastRef.type;
      return (this.iconRegistry.has(iconName) && iconName) || null;
    }
  }

  constructor(
    readonly toastRef: ToastRef,
    protected iconRegistry: SvgIconRegistry,
    @Optional() @Inject(PDS_BUILTIN_TOAST_ICON) protected builtinIcons?: PdsBuiltInToastIcon[]
  ) {}

  protected findBuiltInToastIcon(type: BuiltInToastType): string {
    return this.builtinIcons?.find((def) => def.for === type)?.iconName;
  }
}
