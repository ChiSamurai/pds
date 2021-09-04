import { ɵɵdirectiveInject as directiveInject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BuiltInToastType, Toaster } from '@vitagroup/cdk';

export class DefaultToasterExample {
  readonly toaster = directiveInject(Toaster);
  readonly toastTypes: BuiltInToastType[] = ['info', 'success', 'warning', 'error'];

  toastControl = new FormGroup({
    message: new FormControl('Hey there 👋'),
    type: new FormControl('info'),
  });

  popToast(): void {
    const { message, type } = this.toastControl.getRawValue();

    if (message) this.toaster.push(message, { type }).pop(4000);
  }
}
