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
      <div><span [ngStyle]="{fontStyle: 'italic'}">{{snippet.language | titlecase}}</span></div>
      <div>
        <pre><code [innerHTML]="snippet.code | hljs : snippet.language"></code>
        </pre>
      </div>
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
    this.fetchSnippet('html');
    this.fetchSnippet('ts');
  }

  private fetchSnippet(fileExtension: string): void {
    let language = 'plaintext';
    switch (fileExtension) {
      case 'ts':
        language = 'typescript';
        break;
      case 'html':
        language = 'html';
        break;
    }
    this.http.get(SOURCE_ASSETS_BASE + this.docName + '/snippets/' + this.snippetName + '.' + fileExtension, {responseType: 'text'}).subscribe(result => {
        this.addSnippet({
          code: result,
          language
        });
      },
      () => {
        console.log('no ' + language + 'snippet found for this example');
      });

  }

  private addSnippet(snippet: ISnippet) {
    this.snippets = [...this.snippets, snippet];
  }
}
