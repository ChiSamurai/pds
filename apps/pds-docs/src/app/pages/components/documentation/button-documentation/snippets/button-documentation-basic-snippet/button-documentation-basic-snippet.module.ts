import { ChangeDetectionStrategy, Component, NgModule, ViewEncapsulation } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';

@Component({
  selector: 'pds-app-button-documentation-basic-snippet',
  templateUrl: `./button-documentation-basic-snippet.html`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDocumentationBasicSnippetComponent {
}

@NgModule({
  imports: [
    SvgIconModule
  ],
  declarations: [ButtonDocumentationBasicSnippetComponent],
  exports: [ButtonDocumentationBasicSnippetComponent]
})
export class ButtonDocumentationBasicSnippetModule {
}
