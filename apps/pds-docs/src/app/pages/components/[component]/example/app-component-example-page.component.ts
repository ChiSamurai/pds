import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppExample } from '../../../../interfaces/app-example.interface';

@Component({
  selector: 'pds-app-component-example-page',
  styleUrls: ['app-component-example-page.component.scss'],
  template: `
    <ng-container *ngIf="routeExamples | async as examples">
      <ng-container *ngFor="let example of examples; let last = last">
        <div class="example-container">{{ example.template | ngCompile: example }}</div>
        <div class="example-source-header">
          <h4 class="example-source-h">Template Source</h4>
          <button class="secondary small" (click)="clipboard.copy(example.template.trim())">
            <svg-icon name="copy"></svg-icon>
            <span>Copy</span>
          </button>
        </div>
        <div class="example-source">
          <pre><code [innerHTML]="example.template | hljs: 'html'"></code></pre>
        </div>
        <pds-divider space="xxl" *ngIf="!last"></pds-divider>
      </ng-container>
    </ng-container>
  `,
})
export class AppComponentExamplePageComponent {
  @ViewChild('exampleEditorContainer')
  protected readonly editorContainer: ElementRef;

  readonly routeExamples: Observable<AppExample[]> = this.route.parent.data.pipe(map((data) => data.examples));

  constructor(readonly clipboard: Clipboard, protected route: ActivatedRoute) {}
}
