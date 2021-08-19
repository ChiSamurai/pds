import { ChangeDetectionStrategy, Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS } from '../../base-documentation/base-documentation.component';
import { BaseDocumentationCardComponent } from '../../base-documentation/base-documentation-card/base-documentation-card.component';

@Component({
  selector: 'pds-app-toggles-documentation',
  templateUrl: './toggles-documentation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TogglesDocumentationComponent {
  @ViewChildren(BaseDocumentationCardComponent) documentationCards: QueryList<BaseDocumentationCardComponent>;
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
}
