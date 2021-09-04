import { Directive, Input, OnChanges, OnDestroy, TemplateRef } from '@angular/core';
import { ToastContext } from './toast-ref';
import { Toaster } from './toaster';

@Directive({ selector: '[toastDef]' })
export class ToastDef implements OnChanges, OnDestroy {
  private _prevType: string;

  @Input('toastDefAs') type: string;

  constructor(readonly template: TemplateRef<ToastContext>, protected toaster: Toaster) {}

  static ngTemplateContextGuard(dir: ToastDef, ctx: unknown): ctx is ToastContext {
    return true;
  }

  protected checkTypeDef(): void {
    if (this.type) {
      this._prevType = this.type;
      this.toaster.typeDefs.set(this._prevType, this.template);
    } else if (this._prevType) {
      this.toaster.typeDefs.delete(this._prevType);
    }
  }

  ngOnChanges() {
    this.checkTypeDef();
  }
  ngOnDestroy() {
    if (this._prevType) {
      this.toaster.typeDefs.delete(this._prevType);
    }
  }
}
