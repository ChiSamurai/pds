import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { getLanguage, highlight } from 'highlight.js';

@Pipe({name: 'hljs'})
export class HighlightJsPipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {
  }

  transform(code: string, lang?: string): SafeHtml {
    return highlight(code?.trim(), {language: getLanguage(lang) ? lang : 'plaintext'}).value;
  }
}

@NgModule({
  declarations: [HighlightJsPipe],
  exports: [HighlightJsPipe]
})
export class HighlightJsPipeModule {
}
