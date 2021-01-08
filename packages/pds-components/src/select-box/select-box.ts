import { Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { SelectBoxBase } from '@vitagroup/cdk';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'pds-select-box',
  styleUrls: ['select-box.scss'],
  encapsulation: ViewEncapsulation.None,
  /* eslint-disable max-len */
  template: `
    <ng-template #fallbackTemplate let-value let-last="last">
      <span>{{ value }}{{ !last ? ', ' : '' }}</span>
    </ng-template>
    <ng-template #selectOptionsTemplate>
      <div class="pds-select-box-overlay-container">
        <ng-content></ng-content>
      </div>
    </ng-template>

    <ng-content select="[selectPrefix]"></ng-content>
    <div class="pds-select-box-value">
      <ng-container *ngIf="placeholder != null && !value?.length">
        <span class="pds-select-box-placeholder">{{ placeholder }}</span>
      </ng-container>
      <ng-container *ngFor="let it of value; let index = index">
        <ng-container
          *ngTemplateOutlet="resolveTemplate(it) || fallbackTemplate; context: resolveTemplateContext(it, index)"
        ></ng-container>
      </ng-container>
    </div>
    <ng-content select="[selectSuffix]"></ng-content>
    <svg-icon
      class="pds-select-box-toggle"
      [name]="'pds-select-box-' + (hasAttachedOverlay ? 'detach-toggle' : 'attach-toggle')"
      viewBox="0 0 18 18"
      (click)="toggleOverlay()"
    >
      <ng-container *ngIf="hasAttachedOverlay; else attachToggleTemplate">
        <svg:path
          d="M14.8,13.1c-0.3,0-0.6-0.1-0.8-0.3l-5-5l-5,5c-0.5,0.5-1.2,0.5-1.6,0c-0.5-0.5-0.5-1.2,0-1.6l5.8-5.8c0.5-0.5,1.2-0.5,1.6,0l5.8,5.8c0.5,0.5,0.5,1.2,0,1.6C15.4,13,15.1,13.1,14.8,13.1z"
        />
      </ng-container>
      <ng-template #attachToggleTemplate>
        <svg:path
          d="M9,13.1c-0.3,0-0.6-0.1-0.8-0.3L2.3,6.9c-0.5-0.5-0.5-1.2,0-1.6c0.5-0.5,1.2-0.5,1.6,0l5,5l5-5c0.5-0.5,1.2-0.5,1.6,0c0.5,0.5,0.5,1.2,0,1.6l-5.8,5.8C9.6,13,9.3,13.1,9,13.1z"
        />
      </ng-template>
    </svg-icon>
    <ng-content select="[selectToggleSuffix]"></ng-content>
  `,
  /* eslint-enable max-len */
})
export class SelectBox<T = any> extends SelectBoxBase<T> implements OnInit {
  @ViewChild('selectOptionsTemplate', { static: true })
  protected overlayTemplate: TemplateRef<any>;

  @Input() inputValue: string;

  ngOnInit() {
    this.focus.ancestors.add(this.overlayRef.overlayElement);
    this.focus
      .asObservable()
      .pipe(takeUntil(this.ngDestroys))
      .subscribe((isFocused) => !isFocused && this.detachOverlay());
  }
}
