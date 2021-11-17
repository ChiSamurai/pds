import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Optional,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { DialogRef } from '@vitagroup/cdk';
import { ShortcutManager } from '@vitagroup/common';
import { PDS_MODAL_ENCAPSULATION } from './modal-encapsulation';
import { PdsModalFooter } from './modal-footer';
import { PdsModalHeader } from './modal-header';

@Component({
  selector: 'pds-modal',
  styleUrls: ['./modal.scss'],
  encapsulation: ViewEncapsulation.None,
  /* eslint-disable max-len */
  template: `
    <ng-template #ngContentTemplate>
      <ng-content></ng-content>
    </ng-template>

    <ng-container *ngIf="!!header">
      <ng-content select="pds-modal-header"></ng-content>
    </ng-container>
    <main cdkScrollable>
      <ng-container *encapsulate="encapsulation">
        <ng-container *ngTemplateOutlet="ngContentTemplate"></ng-container>
      </ng-container>
    </main>
    <ng-container *ngIf="!!footer">
      <ng-content select="pds-modal-footer"></ng-content>
    </ng-container>
  `,
  /* eslint-enable max-len */
})
export class PdsModal implements AfterContentInit {
  @ContentChild(PdsModalHeader, { static: true }) private _staticHeader: PdsModalHeader;
  @ContentChild(PdsModalHeader, { static: false }) private _dynamicHeader: PdsModalHeader;
  @ContentChild(PdsModalFooter, { static: true }) private _staticFooter: PdsModalFooter;
  @ContentChild(PdsModalFooter, { static: false }) private _dynamicFooter: PdsModalFooter;

  private _fullscreen = false;
  private _closeable = false;

  readonly shortcuts = new ShortcutManager(this.renderer, this.elementRef);

  get header(): PdsModalHeader | null {
    return this._dynamicHeader || this._staticHeader;
  }
  get footer(): PdsModalFooter | null {
    return this._dynamicFooter || this._staticFooter;
  }

  @Input() encapsulation: string;

  @Input()
  set closable(value: boolean) {
    this._closeable = coerceBooleanProperty(value);
  }
  get closable(): boolean {
    return this._closeable;
  }

  @Input()
  @HostBinding('class.fullscreen')
  set fullscreen(value: boolean) {
    this._fullscreen = coerceBooleanProperty(value);
  }
  get fullscreen(): boolean {
    return this._fullscreen;
  }

  @Output() readonly closes = new EventEmitter<any>();

  constructor(
    protected renderer: Renderer2,
    protected elementRef: ElementRef,
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional() protected readonly dialogRef?: DialogRef,
    @Optional() @Inject(PDS_MODAL_ENCAPSULATION) encapsulation?: string
  ) {
    if (encapsulation != null) this.encapsulation = encapsulation;
  }

  close(result?: any): void {
    if (this.dialogRef != null) this.dialogRef.dispose(result);
    this.closes.emit(result);
  }

  ngAfterContentInit() {
    if (this.header != null && !this.header.encapsulation) this.header.encapsulation = this.encapsulation;
    if (this.footer != null && !this.footer.encapsulation) this.footer.encapsulation = this.encapsulation;

    this.changeDetectorRef.detectChanges();
  }
}
