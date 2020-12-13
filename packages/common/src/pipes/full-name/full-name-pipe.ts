import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { getStringFormat } from '../../utils';

/**
 * Transforms any object containing full name information into a string. The
 * string format can be provided using the following tokens. If no format is
 * present the pipe will default to "FF LL". Additionally any field can be
 * backed up with a fallback value. As long as it's respective property key is
 * also available in the `fallback` parameter object
 *
 *  | Property    | Token  | Description                                                   | Example      |
 *  |-------------|:------:|---------------------------------------------------------------|--------------|
 *  | `firstName` |  `FF`  | The fully quantified first name of the person                 | Jane, John   |
 *  |             |  `ff`  | Shortened first letter format of the first name of the person | J.           |
 *  | `lastName`  |  `LL`  | The fully quantified last name of the person                  | Doe          |
 *  |             |  `ll`  | Shortened first letter format of the last name of the person  | D.           |
 *  | `title`     |  `TT`  | The title of the person                                       | Dr.          |
 *
 */
@Pipe({ name: 'fullName' })
export class FullNamePipe implements PipeTransform {
  transform(value: any, format: string = 'FF LL', fallback?: any): any {
    return getStringFormat(
      value,
      format,
      {
        // first first name letter including a dot:
        ff: (v) => v.firstName && `${ v.firstName.charAt(0) }.`,
        // first last name letter including a dot:
        ll: (v) => v.lastName && `${ v.lastName.charAt(0) }.`,
        // first name:
        FF: (v) => v.firstName,
        // last name:
        LL: (v) => v.lastName,
        // title
        TT: (v) => v.title
      },
      fallback
    );
  }
}

@NgModule({
  declarations: [ FullNamePipe ],
  exports: [ FullNamePipe ]
})
export class FullNamePipeModule {
}
