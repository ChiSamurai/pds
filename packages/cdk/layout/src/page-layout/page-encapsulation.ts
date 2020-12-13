import { InjectionToken } from '@angular/core';

export enum PageEncapsulation {
  /**
   * Doesn't apply encapsulation to any {@link PageLayout}, {@link PageHeader} nor {@link PageFooter}
   * content. This should only be used to manually manage the {@link FlexContainer} children
   *
   * @example
   * ```html
   * <page-layout>
   *   <page-header>
   *     <fx-container>...</fx-container>
   *   </page-header>
   *
   *   <page-content>
   *     <fx-container>...</fx-container>
   *   </page-content>
   * </page-layout>
   * ```
   */
  None = 'none',
  /**
   * Applies {@link FlexContainer}s as parent for any {@link PageLayout}, {@link PageHeader} or
   * {@link PageFooter} content. This is the default encapsulation mode
   *
   * @example
   * ```html
   * <page-layout>
   *   <page-header>...</page-header>
   *
   *   <page-content>...</page-content>
   * </page-layout>
   * ```
   */
  FxContainer = 'fx-container'
}

export const PAGE_ENCAPSULATION = new InjectionToken<PageEncapsulation>('PAGE_ENCAPSULATION', {
  providedIn: 'root', factory: /* @dynamic */ () => PageEncapsulation.None
});
