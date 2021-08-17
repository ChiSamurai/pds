import { Component, ElementRef, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-app-base-documentation-card',
  templateUrl: './base-documentation-card.component.html',
  styleUrls: ['./base-documentation-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseDocumentationCardComponent {
  @ViewChild('headingElement') anchorRef: ElementRef;

  @Input() topElement: HTMLElement;
  @Input() content: TemplateRef<any>;
  @Input() title: string;
  @Input() id: string;
}
