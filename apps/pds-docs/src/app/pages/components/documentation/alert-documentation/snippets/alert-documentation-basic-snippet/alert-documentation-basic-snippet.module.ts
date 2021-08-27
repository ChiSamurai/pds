import { ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation } from '@angular/core';
import { AlertModule } from '@vitagroup/pds-components';
import { SvgIconModule } from '@vitagroup/cdk';

@Component({
  selector: 'pds-app-alert-basic-snippet',
  templateUrl: `./alert-documentation-basic-snippet.html`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertDocumentationBasicSnippetComponent {
}

@NgModule({
  imports: [
    AlertModule,
    SvgIconModule
  ],
  declarations: [AlertDocumentationBasicSnippetComponent],
  exports: [AlertDocumentationBasicSnippetComponent]
})
export class AlertDocumentationBasicSnippetModule {
}
