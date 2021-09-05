import { AppDocChapters } from '../enums/app-doc-chapters';
import { AppExample } from './app-example.interface';

export interface AppDoc {
  /** Gets the unique slug of the doc */
  readonly slug: string;
  /**
   * Gets or sets the source url of the doc, must be a relative url. If not given,
   * the {@link slug} will be used instead of the src value. The final source url will
   * always be enforced with `.md` as only markdown content is supported right now
   */
  src?: string;

  /** Gets or sets an optional title value for the doc */
  title?: string;
  /** Gets or sets the unique chapter name this doc belongs to */
  chapter?: AppDocChapters | string;
  /** Gets or sets an optional description for the doc */
  description?: string;
  /** Gets or sets an optional list of tags */
  tags?: string[];
  /** Gets or sets the next slug this doc refers to */
  next?: string;
  /** Gets or sets the previous slug this doc refers to */
  previous?: string;
  /** Gets or sets a list of example definitions */
  examples?: AppExample[];
}

export interface AppDocWithContent extends AppDoc {
  /** Gets or sets the markdown content of the guide */
  content: string;
}
