import { APP_INITIALIZER, Provider } from '@angular/core';
import { AppDocService } from '../services/app-doc.service';

export function initAppDocs(docs: AppDocService): () => void {
  return async () => {
    await docs.import('first-steps');

    await docs.import('pds-css.json');
    await docs.import('pds-components.json');
    await docs.import('common.json');
    await docs.import('cdk.json');
  };
}

export const APP_DOCS_INIT_PROVIDER: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initAppDocs,
  deps: [AppDocService],
  multi: true,
};
