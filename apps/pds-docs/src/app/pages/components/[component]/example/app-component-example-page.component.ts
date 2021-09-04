import { Clipboard } from '@angular/cdk/clipboard';
import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from '@vitagroup/cdk';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppExampleWithTemplate } from '../../../../interfaces/app-example.interface';

export type AppComponentExampleDisplayTabs = 'html' | 'typescript';

@Component({
  selector: 'pds-app-component-example-page',
  styleUrls: ['app-component-example-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="routeExamples | async as examples">
      <ng-container *ngFor="let example of examples; let last = last">
        <div class="example-header">
          <h2 class="example-h">{{ example.title }}</h2>
        </div>
        <div class="example-container">{{ example.template | ngCompile: example }}</div>
        <div class="example-header">
          <h4 class="example-h">Source:</h4>
          <pds-tabs class="small" [selectionControl]="['html']" #activeTab="selectionControl">
            <ng-container *ngFor="let tab of displayTabs">
              <pds-tab
                *ngIf="resolveActiveSource(tab, example)"
                [class.active]="activeTab.isSelected(tab)"
                (click)="activeTab.select(tab)"
              >
                {{ tab | titlecase }}
              </pds-tab>
            </ng-container>
          </pds-tabs>
          <button class="secondary small" (click)="copyActiveSource($any(activeTab.first()), example)">
            <svg-icon name="copy"></svg-icon>
            <span>Copy to clipboard</span>
          </button>
        </div>
        <div class="example-source">
          <pre><code [innerHTML]="resolveActiveSource($any(activeTab.first()), example) | hljs: $any(activeTab.first())"></code></pre>
        </div>
        <pds-divider space="xxl" *ngIf="!last"></pds-divider>
      </ng-container>
    </ng-container>
  `,
})
export class AppComponentExamplePageComponent {
  readonly displayTabs: AppComponentExampleDisplayTabs[] = ['html', 'typescript'];

  readonly routeExamples: Observable<AppExampleWithTemplate[]> = this.route.parent.data.pipe(
    map((data) => data.examples)
  );

  constructor(readonly clipboard: Clipboard, protected route: ActivatedRoute, protected toaster: Toaster) {}

  resolveActiveSource(tab: AppComponentExampleDisplayTabs, example: AppExampleWithTemplate): string {
    switch (tab) {
      case 'html':
        return example.template;
      case 'typescript':
        return example.contextSource;
    }
  }
  copyActiveSource(tab: AppComponentExampleDisplayTabs, example: AppExampleWithTemplate): void {
    const activeSource = this.resolveActiveSource(tab, example)?.trim();

    this.clipboard.copy(activeSource);
    this.toaster.pushInfo(`Copied ${tab} source to clipboard`).pop(2500);
  }
}
