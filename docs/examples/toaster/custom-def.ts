import { ɵɵdirectiveInject as directiveInject } from '@angular/core';
import { Toaster } from '@vitagroup/cdk';

export class CustomDefToasterExample {
  readonly toaster = directiveInject(Toaster);

  async popToast() {
    const confirmed = await this.toaster
      .push('What do you think about your experience here so far?', {
        type: 'confirm',
        position: ['center', 'bottom'],
      })
      .pop()
      .toPromise();

    if (confirmed) this.toaster.pushSuccess('🎉💖', { position: ['right', 'bottom'] }).pop(1200);
    else this.toaster.pushError('😢💔', { position: ['left', 'bottom'] }).pop(1200);
  }
}
