import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Type } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as vgCdk from '@vitagroup/cdk';
import * as vgCommon from '@vitagroup/common';
import * as pdsComponents from '@vitagroup/pds-components';
import * as appExampleContexts from 'examples';
import { AppExample, AppExampleWithTemplate } from '../interfaces/app-example.interface';

export const APP_EXAMPLES_BASE_URL = new InjectionToken<string>('The base url of the app examples asset directory', {
  providedIn: 'root',
  factory: () => '/assets',
});

export function findMembersWithNameIncluding(obj: unknown, str: string): Type<unknown>[] {
  return Object.values(obj).filter((member) => {
    return (member as Type<unknown>)?.name?.includes(str);
  }) as Type<unknown>[];
}

export const APP_EXAMPLE_MODULE_IMPORTS = new InjectionToken<Type<unknown>[]>(
  'Module imports that should be available for example templates',
  {
    providedIn: 'root',
    factory: () => [
      CommonModule,
      ReactiveFormsModule,
      ...findMembersWithNameIncluding(vgCommon, 'Module'),
      ...findMembersWithNameIncluding(vgCdk, 'Module'),
      ...findMembersWithNameIncluding(pdsComponents, 'Module'),
    ],
  }
);
export const APP_EXAMPLE_CONTEXTS = new InjectionToken<Type<unknown>[]>('APP_EXAMPLE_CONTEXTS', {
  providedIn: 'root',
  factory: () => [...findMembersWithNameIncluding(appExampleContexts, 'Example')],
});

@Injectable({ providedIn: 'root' })
export class AppExampleService {
  constructor(
    @Inject(APP_EXAMPLES_BASE_URL) readonly baseUrl: string,
    @Inject(APP_EXAMPLE_MODULE_IMPORTS) protected moduleImports: Type<unknown>[],
    @Inject(APP_EXAMPLE_CONTEXTS) protected contexts: Type<unknown>[],
    protected http: HttpClient
  ) {}

  resourceSourceFile(fileUrl: string): Promise<string> {
    return this.http.get(vgCommon.normalizeUrl(this.baseUrl, fileUrl), { responseType: 'text' }).toPromise();
  }
  resolveModuleImport(moduleName: string): Type<unknown> {
    return this.moduleImports?.find((moduleType) => moduleType.name === moduleName);
  }
  resolveContext(className: string): Type<unknown> {
    return this.contexts.find((context) => context.name === className);
  }

  async resolve(example: AppExample): Promise<AppExampleWithTemplate> {
    const template = await this.resourceSourceFile(example.templateUrl);
    const contextSource = example.contextUrl && (await this.resourceSourceFile(example.contextUrl));

    const context = this.resolveContext(example.context as string);
    // since the example definition may only hold string representations of the actual module imports, we are
    // trying to map each potential module name to a available module within APP_EXAMPLE_MODULE_IMPORTS
    const imports = ((example.imports as unknown) as string[])
      ?.map((moduleName) => this.resolveModuleImport(moduleName))
      ?.filter((module) => typeof module === 'function');

    return { template, ...example, imports, context, contextSource };
  }
}
