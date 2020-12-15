import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MODAL_ENCAPSULATION } from './modal-encapsulation';

@Component({
  selector: 'pds-modal-header',
  styleUrls: [ './modal-header.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *encapsulate="encapsulation">
      <ng-content></ng-content>
      <ng-container *ngIf="closeTemplate.getValue() as closeTemplateRef">
        <ng-container *ngTemplateOutlet="closeTemplateRef"></ng-container>
      </ng-container>
    </ng-container>`
})
export class ModalHeader implements OnInit, OnDestroy {
  protected readonly ngDestroys = new Subject<void>();

  readonly closeTemplate = new BehaviorSubject<TemplateRef<any>>(null);

  @Input() encapsulation: string;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(MODAL_ENCAPSULATION) encapsulation: string
  ) {
    if (encapsulation != null) this.encapsulation = encapsulation;
  }

  ngOnInit() {
    this.closeTemplate.asObservable().pipe(takeUntil(this.ngDestroys))
      .subscribe(() => this.changeDetectorRef.detectChanges());
  }
  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
