import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { getLanguage, highlight } from 'highlight.js';
import * as marked from 'marked';

@Pipe({ name: 'marked' })
export class MarkedPipe implements PipeTransform {
  transform(src: string, options?: marked.MarkedOptions): string {
    return marked(src, {
      smartLists: true,
      smartypants: true,
      highlight(code: string, lang: string): string | void {
        return highlight(getLanguage(lang) ? lang : 'plaintext', code).value;
      },
      ...options,
    });
  }
}

@NgModule({
  declarations: [MarkedPipe],
  exports: [MarkedPipe],
})
export class MarkedPipeModule {}
