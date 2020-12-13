export type TrimSchemaPropertyMode = 'leading' | 'trailing' | 'both';

export interface TrimSchemaPropertyOptions {
  mode?: TrimSchemaPropertyMode;
  include?: Array<RegExp | string>;
}

export function trimSchemaProperties<T>(obj: T, options?: TrimSchemaPropertyOptions): T {
  return Object.entries(obj).reduce((result, [ key, value ]) => {
    // "default values"
    const mode = options?.mode || 'both';
    const regExpGroups = [ '\\s+', ...(options?.include || []) ].join('|');
    const leadingRegExp = new RegExp(`^(${regExpGroups})`);
    const trailingRegExp = new RegExp(`(${regExpGroups})$`);

    if (typeof value !== 'string') return { ...result, [ key ]: value };
    else {
      let trim: string = value;

      if (mode === 'leading' || mode === 'both')
        trim = trim.replace(leadingRegExp, '');
      if (mode === 'trailing' || mode === 'both')
        trim = trim.replace(trailingRegExp, '');

      return { ...result, [ key ]: trim };
    }
  }, {} as any);
}
