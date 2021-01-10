export interface AppGuide {
  /** Gets the unique slug of the guide */
  readonly slug: string;
  /**
   * Gets or sets the source url of the guide, must be a relative url. If not given,
   * the {@link slug} will be used instead of the src value. The final source url will
   * always be enforced with `.md` as only markdown content is supported right now
   */
  src?: string;

  /** Gets or sets an optional title value for the guide */
  title?: string;
  /** Gets or sets an optional description for the guide */
  description?: string;
  /** Gets or sets the next slug this guide wants to refer to */
  next?: string;
  /** Gets or sets the previous slug this guide wants to refer to */
  previous?: string;
}

export interface AppGuideWithContent extends AppGuide {
  /** Gets or sets the markdown content of the guide */
  content: string;
}
