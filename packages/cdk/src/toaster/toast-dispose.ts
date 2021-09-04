import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { EventUnlistener, ShortcutManager } from '@vitagroup/common';
import { ToastRef } from './toast-ref';

@Directive({ selector: '[toastDispose]' })
export class ToastDispose<R = any> implements OnInit, OnDestroy {
  protected unlistenClicks: EventUnlistener;

  readonly shortcuts = new ShortcutManager(this.renderer, this.elementRef);

  @Input('toastDispose') result: R;

  constructor(protected toastRef: ToastRef, protected elementRef: ElementRef, protected renderer: Renderer2) {}

  protected onClick(): void {
    this.toastRef.dispose(this.result);
  }

  ngOnInit() {
    this.unlistenClicks = this.renderer.listen(this.elementRef.nativeElement, 'click', () => this.onClick());

    this.shortcuts.register('enter', () => this.onClick());
  }
  ngOnDestroy() {
    this.unlistenClicks();
    this.shortcuts.clear();
  }
}
