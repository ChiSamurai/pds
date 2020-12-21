import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentChecked,
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
import { DialogOverlay, DialogRef } from '@vitagroup/cdk';
import { MODAL_ENCAPSULATION } from './modal-encapsulation';
import { ModalFooter } from './modal-footer';
import { ModalHeader } from './modal-header';

@Component({
  selector: 'pds-modal',
  styleUrls: ['./modal.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #ngContentTemplate>
      <ng-content></ng-content>
    </ng-template>
    <ng-template #closeTemplate>
      <svg-icon *ngIf="closable" (click)="close()" id="close" viewBox="0 0 22 22">
        <svg:path
          d="M20.7 18.7c.6.6.6 1.4 0 1.9-.3.3-.6.4-1 .4s-.7-.1-1-.4L11 12.9l-7.7 7.7c-.3.4-.6.5-1 .5s-.7-.1-1-.4c-.5-.5-.5-1.4 0-1.9L9.1 11 1.3 3.3c-.5-.5-.5-1.5 0-2 .6-.5 1.5-.5 2 0L11 9.1l7.7-7.7c.5-.5 1.4-.5 1.9 0s.5 1.4 0 1.9L12.9 11l7.8 7.7z"
        />
      </svg-icon>
    </ng-template>

    <ng-container *ngIf="header != null; else closeTemplate">
      <ng-content select="pds-modal-header"></ng-content>
    </ng-container>
    <main #main>
      <ng-container *encapsulate="encapsulation">
        <ng-container *ngTemplateOutlet="ngContentTemplate"></ng-container>
      </ng-container>
    </main>
    <ng-container *ngIf="footer != null">
      <ng-content select="pds-modal-footer"></ng-content>
    </ng-container>
  `,
})
export class Modal implements AfterContentChecked {
  @ContentChild(ModalHeader, { static: true }) private _staticHeader: ModalHeader;
  @ContentChild(ModalHeader, { static: false }) private _dynamicHeader: ModalHeader;
  @ContentChild(ModalFooter, { static: true }) private _staticFooter: ModalHeader;
  @ContentChild(ModalFooter, { static: false }) private _dynamicFooter: ModalHeader;

  @ViewChild('closeTemplate') private _closeTemplateRef: TemplateRef<any>;

  private _fullscreen: boolean = false;
  private _closeable: boolean = false;

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
  @HostBinding('class.fullscreen')
  set fullscreen(value: boolean) {
    this._fullscreen = coerceBooleanProperty(value);
    this.updateFullscreenOverlayConfig();
  }
  get fullscreen(): boolean {
    return this._fullscreen;
  }

  @Input()
  set closable(value: boolean) {
    this._closeable = coerceBooleanProperty(value);
  }
  get closable(): boolean {
    return this._closeable;
  }

  @Output() readonly closes = new EventEmitter<any>();

  constructor(
    @Optional() protected readonly dialog: DialogOverlay,
    @Optional() protected readonly dialogRef: DialogRef,
    @Optional() @Inject(MODAL_ENCAPSULATION) encapsulation: string
  ) {
    if (encapsulation != null) this.encapsulation = encapsulation;
  }

  close(result?: any): void {
    if (this.dialogRef != null) this.dialogRef.dispose(result);
    this.closes.emit(result);
  }

  ngAfterContentChecked() {
    if (this.header != null && this.header.closeTemplate.getValue() !== this._closeTemplateRef)
      this.header.closeTemplate.next(this._closeTemplateRef);
  }

  protected updateFullscreenOverlayConfig() {
    this.dialogRef.overlayRef.updatePositionStrategy(
      this.fullscreen
        ? this.dialog.position().global().top().left()
        : this.dialog.position().global().centerVertically().centerHorizontally()
    );
    this.dialogRef.overlayRef.updateSize({
      height: this.fullscreen ? '100vh' : null,
      width: this.fullscreen ? '100vw' : null,
    });
  }
}
