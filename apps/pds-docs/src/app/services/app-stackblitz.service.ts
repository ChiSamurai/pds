import { Injectable } from '@angular/core';
import { Project } from '@stackblitz/sdk/typings/interfaces';
import sdk from '@stackblitz/sdk';
import { HttpClient } from '@angular/common/http';
import { IStackblitzComponent } from '../interfaces/stackblitzComponent.interface';

enum APP_MODULE_TEMPLATE_PLACEHOLDERS {
  MODULE_IMPORT = '###snippetModuleImport###',
  MODULE_NAME = '###snippetModuleName###',
  COMPONENT = '###snippetComponent###'
}


@Injectable({
  providedIn: 'root'
})
export class AppStackblitzService {
  readonly fileList = [
    'index.html',
    '.angular-cli.json',
    'styles.scss',
    'tsconfig.json',
    'src/main.ts'
  ];
  private stackblitzBaseFiles: { [key: string]: string } = {};

  constructor(protected http: HttpClient) {
    this.loadStackblitzFiles();
  }

  startProject(stackblitzComponent: IStackblitzComponent) {
    const newProject = this.newProject();
    stackblitzComponent.assets.forEach(async asset => {
      newProject.files['src/app/' + asset.stackblitzFilename] = await this.fetchAsset(asset.assetUrl);
    });

    //create the module File
    this.createAppModule(
      stackblitzComponent.moduleName,
      stackblitzComponent.name,
      stackblitzComponent.componentSelector
    ).then(appModuleString => {
      newProject.files['src/app/app.module.ts'] = appModuleString;
      sdk.openProject(newProject);
    });
  }

  private newProject(): Project {
    return {
      files: {...this.stackblitzBaseFiles},
      title: 'PDS Sandbox',
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

  }

  private loadStackblitzFiles() {
    this.fileList.forEach(async filename => {
      this.stackblitzBaseFiles[filename] = await this.fetchAsset('./assets/stackblitz-base/' + filename);
    });
  }

  private fetchAsset(filename: string): Promise<string> {
    return this.http.get(filename, {responseType: 'text'}).toPromise();
  }

  private async createAppModule(moduleName: string, componentName: string, componentSelector: string): Promise<string> {
    let appModuleString = await this.fetchAsset('./assets/stackblitz-base/src/app/_app.module.ts.txt');
    const importString = `import { ${moduleName} } from './${componentName}/${componentName}.module';\n`;
    appModuleString = appModuleString.replace(APP_MODULE_TEMPLATE_PLACEHOLDERS.MODULE_NAME, moduleName);
    appModuleString = appModuleString.replace(APP_MODULE_TEMPLATE_PLACEHOLDERS.COMPONENT, `<${componentSelector}></${componentSelector}>`);
    appModuleString = appModuleString.replace(APP_MODULE_TEMPLATE_PLACEHOLDERS.MODULE_IMPORT, importString);
    return Promise.resolve(appModuleString);
  }
}
