import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS } from '../../base-documentation/base-documentation.component';
import sdk from '@stackblitz/sdk';
import { Project } from '@stackblitz/sdk/typings/interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'pds-app-alert-documentation',
  templateUrl: './alert-documentation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    pds-alert {
      margin: 1em;
    }
  `]
})
export class AlertDocumentationComponent implements OnInit {
  @ViewChild('stackblitz') sbNode: ElementRef<HTMLDivElement>;

  readonly fileList = [
    'index.html',
    '.angular-cli.json',
    'styles.scss',
    'tsconfig.json',
    'src/main.ts',
    'src/app/app.component.ts',
    'src/app/app.module.ts'
  ];

  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  private project: Project;

  constructor(protected httpClient: HttpClient) {
  }

  ngOnInit() {
    this.project = {
      files: {},
      title: 'Dynamically Generated Project',
      description: 'Created with <3 by the StackBlitz SDK!',
      template: 'angular-cli',
      tags: ['stackblitz', 'sdk'],
      dependencies: {
        '@vitagroup/pds-components': '*',
        '@vitagroup/pds-css': '*',
        '@vitagroup/cdk': '*',
        '@vitagroup/common': '*',
        '@angular/cdk': '*',
        '@ng-web-apis/common': '*',
        '@angular/flex-layout': '*'
      }
    } as Project;
    this.loadStackblitzFiles();
  }

  loadStackblitzFiles() {
    this.fileList.forEach(async filename => {
      this.project.files[filename] = await this.httpClient.get('./assets/stackblitz-base/' + filename, {responseType: 'text'}).toPromise();
    });
    console.log(this.project);
  }

  openProject() {
    sdk.openProject(this.project);
  }
}
