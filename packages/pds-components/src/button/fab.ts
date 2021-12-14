import { Component, ElementRef, NgModule, Renderer2, ViewEncapsulation } from '@angular/core';
import { ElementActiveState, ElementDisabledState, ElementFocusState, SVG_ICON_SIZE } from '@vitagroup/cdk';

/** @deprecated Use `<button class="fab">...</button>` instead (included in the pds-css package) */
@Component({
  selector: 'pds-fab',
  styleUrls: ['./fab.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: SVG_ICON_SIZE, useValue: 24 }],
  template: `
    <ng-content select="svg-icon"></ng-content>
    <ng-content></ng-content>
  `,
})
export class PdsFabButton {
  readonly focus = new ElementFocusState(this.elementRef, this.renderer);
  readonly active = new ElementActiveState(this.elementRef, this.renderer);
  readonly disabled = new ElementDisabledState(this.elementRef, this.renderer);

  constructor(protected elementRef: ElementRef, protected renderer: Renderer2) {}
}

/** @deprecated Use `<button class="fab">...</button>` instead (included in the pds-css package) */
@NgModule({
  declarations: [PdsFabButton],
  exports: [PdsFabButton],
  imports: [],
})
export class PdsFabModule {}
