import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { getLanguage, highlight } from 'highlight.js';
import * as marked from 'marked';

@Pipe({ name: 'md' })
export class MarkedPipe implements PipeTransform {
  transform(src: string, options?: marked.MarkedOptions & { inline: boolean }): string {
    options = {
      smartLists: true,
      smartypants: true,
      highlight(code: string, lang: string): string | void {
        return highlight(code, { language: getLanguage(lang) ? lang : 'plaintext' }).value;
      },
      ...options,
    };

    if (!options.inline) return marked(src, options);
    else return marked.parseInline(src, options);
  }
}

@NgModule({
  declarations: [MarkedPipe],
  exports: [MarkedPipe],
})
export class MarkedPipeModule {}
