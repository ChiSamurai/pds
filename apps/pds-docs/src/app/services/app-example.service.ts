import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { SvgIconModule } from '@vitagroup/cdk';
import { ClipPipeModule, normalizeUrl } from '@vitagroup/common';
import { PdsBadgeModule, PdsNavModule } from '@vitagroup/pds-components';
import { AppExample, AppExampleModuleDef } from '../interfaces/app-example.interface';
import { NgCompileOptions } from '../pipes/ng-compile.pipe';

export const APP_EXAMPLES_BASE_URL = new InjectionToken<string>('The base url of the app examples asset directory', {
  providedIn: 'root',
  factory: () => '/assets',
});

export const APP_EXAMPLE_MODULE_DEFS = new InjectionToken<AppExampleModuleDef[]>(
  'Module imports that are available to example compilations',
  {
    providedIn: 'root',
    factory: () => [
      {
        import: [PdsNavModule],
        for: /<\s*pds-nav/m,
      },
      {
        import: [PdsBadgeModule],
        for: /<\s*pds-badge/m,
      },
      {
        import: [SvgIconModule],
        for: /<\s*svg-icon/m,
      },
      {
        import: [ClipPipeModule],
        for: /{{.+\|\s*clip/m,
      },
    ],
  }
);

@Injectable({ providedIn: 'root' })
export class AppExampleService {
  constructor(
    @Inject(APP_EXAMPLES_BASE_URL) readonly baseUrl: string,
    @Inject(APP_EXAMPLE_MODULE_DEFS) readonly moduleDefs: AppExampleModuleDef[],
    protected http: HttpClient
  ) {}

  resolveTemplate(exampleUrl: string): Promise<string> {
    return this.http.get(normalizeUrl(this.baseUrl, exampleUrl), { responseType: 'text' }).toPromise();
  }
  resolveCompileOptionsFromTemplate(template: string): NgCompileOptions {
    const options: NgCompileOptions = {
      imports: [],
    };

    for (const moduleDef of this.moduleDefs) {
      if (moduleDef.for.test(template)) options.imports.push(...moduleDef.import);
    }

    return options;
  }

  async resolve(exampleUrl: string): Promise<AppExample> {
    const template = await this.resolveTemplate(exampleUrl);
    const options = this.resolveCompileOptionsFromTemplate(template);

    return { template, ...options };
  }
}
