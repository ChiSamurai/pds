import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Type } from '@angular/core';
import * as vgCdk from '@vitagroup/cdk';
import * as vgCommon from '@vitagroup/common';
import * as pdsComponents from '@vitagroup/pds-components';
import { AppExample, AppExampleWithTemplate } from '../interfaces/app-example.interface';

export const APP_EXAMPLES_BASE_URL = new InjectionToken<string>('The base url of the app examples asset directory', {
  providedIn: 'root',
  factory: () => '/assets',
});

export function findMembersWithModuleInName(obj: unknown): Type<unknown>[] {
  return Object.values(obj).filter((member) => {
    return (member as Type<unknown>)?.name?.includes('Module');
  }) as Type<unknown>[];
}

export const APP_EXAMPLE_MODULE_IMPORTS = new InjectionToken<Type<unknown>[]>(
  'Module imports that should be available for example templates',
  {
    providedIn: 'root',
    factory: () => [
      CommonModule,
      ...findMembersWithModuleInName(vgCommon),
      ...findMembersWithModuleInName(vgCdk),
      ...findMembersWithModuleInName(pdsComponents),
    ],
  }
);

@Injectable({ providedIn: 'root' })
export class AppExampleService {
  constructor(
    @Inject(APP_EXAMPLES_BASE_URL) readonly baseUrl: string,
    @Inject(APP_EXAMPLE_MODULE_IMPORTS) protected moduleImports: Type<unknown>[],
    protected http: HttpClient
  ) {}

  resolveTemplate(exampleUrl: string): Promise<string> {
    return this.http.get(vgCommon.normalizeUrl(this.baseUrl, exampleUrl), { responseType: 'text' }).toPromise();
  }
  resolveModuleImport(moduleName: string): Type<unknown> {
    return this.moduleImports?.find((moduleType) => moduleType.name === moduleName);
  }

  async resolve(example: AppExample): Promise<AppExampleWithTemplate> {
    const template = await this.resolveTemplate(example.templateUrl);
    // since the example definition may only hold string representations of the actual module imports, we are
    // trying to map each potential module name to a available module within APP_EXAMPLE_MODULE_IMPORTS
    const imports = ((example.imports as unknown) as string[])
      ?.map((moduleName) => this.resolveModuleImport(moduleName))
      ?.filter((module) => typeof module === 'function');

    return { template, ...example, imports };
  }
}
