import { HttpParameterCodec, HttpParams } from '@angular/common/http';

export type QueryParams = Record<string, string[] | string>;

export function parseQueryParams(url: string, encoder?: HttpParameterCodec): QueryParams | null {
  const searchStr = url?.split('?')?.[1];

  if (!searchStr) return null;

  const params = new HttpParams({ encoder, fromString: searchStr });
  return params.keys().reduce((queryParams, key) => {
    const values = params.getAll(key);
    queryParams[key] = values?.length > 1 ? values : values?.[0];
    return queryParams;
  }, {} as QueryParams);
}
