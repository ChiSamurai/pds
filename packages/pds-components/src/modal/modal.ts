import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DialogRef } from '@vitagroup/cdk';
import { MODAL_ENCAPSULATION } from './modal-encapsulation';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

@Component({
  selector: 'pds-modal',
  styleUrls: ['./modal.scss'],
  encapsulation: ViewEncapsulation.None,
  /* eslint-disable max-len */
  template: `
    <ng-template #ngContentTemplate>
      <ng-content></ng-content>
    </ng-template>

    <ng-container *ngIf="header != null">
      <ng-content select="pds-modal-header"></ng-content>
    </ng-container>
    <main cdkScrollable>
      <ng-container *encapsulate="encapsulation">
        <ng-container *ngTemplateOutlet="ngContentTemplate"></ng-container>
      </ng-container>
    </main>
    <ng-container *ngIf="footer != null">
      <ng-content select="pds-modal-footer"></ng-content>
    </ng-container>
  `,
  /* eslint-enable max-len */
})
export class Modal implements AfterContentInit {
  @ContentChild(ModalHeader, { static: true }) private _staticHeader: ModalHeader;
  @ContentChild(ModalHeader, { static: false }) private _dynamicHeader: ModalHeader;
  @ContentChild(ModalFooter, { static: true }) private _staticFooter: ModalHeader;
  @ContentChild(ModalFooter, { static: false }) private _dynamicFooter: ModalHeader;

  private _fullscreen = false;
  private _closeable = false;

  /** Gets the {@link ModalHeader} component instance, preferring any dynamically added references */
  get header(): ModalHeader | null {
    return this._dynamicHeader || this._staticHeader;
  }
  /** Gets the {@link ModalFooter} component instance, preferring any dynamically added references */
  get footer(): ModalFooter | null {
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
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional() protected readonly dialogRef?: DialogRef,
    @Optional() @Inject(MODAL_ENCAPSULATION) encapsulation?: string
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
