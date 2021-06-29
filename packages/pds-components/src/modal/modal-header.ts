import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { PDS_MODAL_ENCAPSULATION } from './modal-encapsulation';

@Component({
  selector: 'pds-modal-header',
  styleUrls: ['./modal-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *encapsulate="encapsulation">
      <ng-content></ng-content>
    </ng-container>
  `,
})
export class PdsModalHeader implements OnDestroy {
  protected readonly ngDestroys = new Subject<void>();

  @Input() encapsulation: string;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(PDS_MODAL_ENCAPSULATION) encapsulation: string
  ) {
    if (encapsulation != null) this.encapsulation = encapsulation;
  }

  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
