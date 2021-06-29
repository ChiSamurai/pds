import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { EventUnlistener, ShortcutManager } from '@vitagroup/common';
import { DialogRef } from './dialog-ref';

@Directive({ selector: '[dialogDispose]' })
export class DialogDispose<R = any> implements OnInit, OnDestroy {
  protected unlistenClicks: EventUnlistener;

  readonly shortcuts = new ShortcutManager(this.renderer, this.elementRef);

  @Input('dialogDispose') result: R;

  constructor(protected dialogRef: DialogRef, protected elementRef: ElementRef, protected renderer: Renderer2) {}

  protected onClick(): void {
    this.dialogRef.dispose(this.result);
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
