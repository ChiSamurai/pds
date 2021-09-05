import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { AppDocService } from '../../services/app-doc.service';

@Component({
  selector: 'pds-app-docs-page',
  styleUrls: ['./app-docs-page.components.scss'],
  templateUrl: './app-docs-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDocsPageComponent {
  readonly routeChapters = this.route.params.pipe(
    map(({ chapter }) => this.docs.chapters?.filter((c) => !chapter || chapter === c) || this.docs.chapters)
  );

  constructor(readonly docs: AppDocService, protected route: ActivatedRoute) {}
}
