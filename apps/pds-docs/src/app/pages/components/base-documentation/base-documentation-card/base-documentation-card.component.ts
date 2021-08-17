import { Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'pds-app-base-documentation-card',
  templateUrl: './base-documentation-card.component.html',
  styleUrls: ['./base-documentation-card.component.scss']
})
export class BaseDocumentationCardComponent {
  @ViewChild('titleAnchor') anchorRef: ElementRef;

  @Input() topElement?: HTMLElement;
  @Input() contentTemplateRef: TemplateRef<any>;
  @Input() title: string;
}
