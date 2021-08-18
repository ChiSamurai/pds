import { Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS } from '../../base-documentation/base-documentation.component';
import { BaseDocumentationCardComponent } from '../../base-documentation/base-documentation-card/base-documentation-card.component';

@Component({
  selector: 'pds-app-combo-box-documentation',
  templateUrl: './combo-box-documentation.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ComboBoxDocumentationComponent {
  @ContentChildren(BaseDocumentationCardComponent) documentationCards: QueryList<BaseDocumentationCardComponent>;

  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
}
