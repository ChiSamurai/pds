import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

export const SOURCE_ASSETS_BASE = '/assets/snippets/';

export interface ISnippet {
  code: string,
  language: string
}

@Component({
  selector: 'pds-app-snippet-source',
  template: `
    <div *ngFor="let snippet of snippets">
    <pre><code [innerHTML]="snippet.code | hljs : snippet.language"></code>
    </pre>
    </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class SnippetSourceComponent implements AfterViewInit {
  @Input() docName: string;
  @Input() snippetName: string;

  snippets: ISnippet[] = [];

  constructor(protected http: HttpClient) {
  }

  ngAfterViewInit() {
    this.http.get(SOURCE_ASSETS_BASE + this.docName + '/snippets/' + this.snippetName + '.html', {responseType: 'text'}).subscribe(result => {
      this.addSnippet({
        code: result,
        language: 'html'
      });
    });

    this.http.get(SOURCE_ASSETS_BASE + this.docName + '/snippets/' + this.snippetName + '.ts', {responseType: 'text'}).subscribe(result => {
      this.addSnippet({
        code: result,
        language: 'typescript'
      });
      console.log(this.snippets);
    });
  }

  addSnippet(snippet: ISnippet) {
    this.snippets = [...this.snippets, snippet];
  }
}
