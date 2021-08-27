import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { AppStackblitzService } from '../../../../services/app-stackblitz.service';
import { ISnippet } from '../../../../interfaces/snippet.inteface';
import { IStackblitzComponent, IStackblitzComponentAsset } from '../../../../interfaces/stackblitzComponent.interface';

export const SOURCE_ASSETS_BASE = '/assets/snippets/';

@Component({
  selector: 'pds-app-snippet-source',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <div fxFlex>
        <button class="secondary"
                (click)="collapsed = true"
                *ngIf="!collapsed">
          Hide snippet
        </button>
        <button class="secondary"
                (click)="collapsed = false"
                *ngIf="collapsed">
          Show snippet
        </button>
      </div>
      <div fxFlex>
        <button class="secondary" (click)="startSandbox()">
          Start stackblitz
        </button>
      </div>
    </div>

    <div [hidden]="collapsed">
      <div *ngFor="let snippet of snippets">
        <div><span [ngStyle]="{fontStyle: 'italic'}">{{snippet.language | titlecase}}</span></div>
        <div>
          <pre><code [innerHTML]="snippet.code | hljs : snippet.language"></code>
          </pre>
        </div>
      </div>
    </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class SnippetSourceComponent implements AfterViewInit {
  @Input() docName: string;
  @Input() snippetDirectory: string;
  @Input() snippetModuleName: string;
  @Input() snippetComponentSelector: string;
  @Input() collapsed = false;

  @Input() imports: { [key: string]: string } = {};
  @Input() declarations: { [key: string]: string } = {};
  @Input() dependencies: { [key: string]: string } = {};

  snippets: ISnippet[] = [];


  constructor(
    protected http: HttpClient,
    protected stackblitz: AppStackblitzService
  ) {
  }

  ngAfterViewInit() {
    this.fetchSnippet('html');
    this.fetchSnippet('ts');
  }

  public startSandbox() {
    const sbComponentData = {
      name: this.snippetDirectory,
      moduleName: this.snippetModuleName,
      componentSelector: this.snippetComponentSelector,
      dependencies: this.dependencies,
      assets: []
    } as IStackblitzComponent;

    // Fetch the snippet files (html template & typescript)
    sbComponentData.assets = this.snippets.map(snippet => <IStackblitzComponentAsset>{
      assetUrl: SOURCE_ASSETS_BASE + this.docName + '/snippets/' + this.snippetDirectory + '/' + snippet.filename,
      stackblitzFilename: this.snippetDirectory + '/' + snippet.filename
    });

    // Fetch the snippet module template file
    const moduleFilename = `${this.snippetDirectory}.module.ts`;
    sbComponentData.assets.push({
      assetUrl: SOURCE_ASSETS_BASE + this.docName + '/snippets/' + this.snippetDirectory + '/' + moduleFilename,
      stackblitzFilename: this.snippetDirectory + '/' + moduleFilename
    });

    this.stackblitz.startProject(sbComponentData);
  }

  private fetchSnippet(fileExtension: string): void {
    const filename = this.snippetDirectory + '.' + fileExtension;
    let language = 'plaintext';
    switch (fileExtension) {
      case 'ts':
        language = 'typescript';
        break;
      case 'html':
        language = 'html';
        break;
    }
    this.http.get(SOURCE_ASSETS_BASE + this.docName + '/snippets/' + this.snippetDirectory + '/' + filename, {responseType: 'text'}).subscribe(result => {
        this.addSnippet({
          filename,
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
