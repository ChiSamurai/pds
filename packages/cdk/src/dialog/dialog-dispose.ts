import { Directive, HostListener, Input } from '@angular/core';
import { DialogRef } from './dialog-ref';

@Directive({ selector: '[dialogDispose]' })
export class DialogDispose<R = any> {
  @Input('dialogDispose') result: R;

  constructor(protected dialogRef: DialogRef) {
  }

  @HostListener('click') onClick(): void {
    this.dialogRef.dispose(this.result);
  }
}
