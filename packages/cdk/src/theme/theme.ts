import { coerceArray } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
  Inject,
  Injectable,
  InjectionToken,
  isDevMode,
  Optional,
  Renderer2,
  RendererFactory2,
  RendererStyleFlags2,
} from '@angular/core';
import { ArrayBehaviorState, BehaviorState } from '@vitagroup/common';

export type ThemeProperty = `--${string}`;

export const THEMES = new InjectionToken<string[]>('THEMES');
export const ACTIVE_THEMES = new InjectionToken<string[]>('ACTIVE_THEMES');

@Injectable()
export class Theme {
  protected readonly activeThemeState = new ArrayBehaviorState<string>();

  readonly renderer: Renderer2;

  readonly available = new ArrayBehaviorState<string>();
  readonly properties = new BehaviorState<Record<ThemeProperty, string>>();

  readonly changes = this.activeThemeState.asObservable();

  constructor(
    @Inject(THEMES) themes: /* @dynamic */ string[],
    @Inject(DOCUMENT) protected document: /* @dynamic */ Document,
    rendererFactory: RendererFactory2,
    @Optional()
    @Inject(ACTIVE_THEMES)
    initiallyActiveThemes?: /* @dynamic */ string[]
  ) {
    this.renderer = rendererFactory.createRenderer(this.document.body, null);
    this.available.reset(...themes);

    if (initiallyActiveThemes?.length) this.activate(initiallyActiveThemes);
  }

  isActive(theme: string): boolean {
    return this.activeThemeState.snapshot.includes(theme);
  }

  activate(themes: string[] | string): void {
    themes = coerceArray(themes);

    for (const theme of themes) {
      if (isDevMode() && !this.available.snapshot.includes(theme)) console.warn(`Activating unknown theme "${theme}"`);

      // skip to next iteration if the theme is already active
      if (this.isActive(theme)) continue;

      this.renderer.addClass(this.document.body, theme);
      this.activeThemeState.push(theme);
    }
  }
  deactivate(themes: string[] | string): void {
    themes = coerceArray(themes);

    for (const theme of themes) {
      // skip to the next iteration if the theme is not active
      if (!this.isActive(theme)) continue;

      this.renderer.removeClass(this.document.body, theme);
      this.activeThemeState.removeAt(this.activeThemeState.snapshot.indexOf(theme));
    }
  }

  setProperty(property: ThemeProperty, value: string | null): void {
    // for some reason a RendererStyleFlags2 value is required to properly render the style property. since
    // we do not need it be "important" we can fall back to the "dash-case" behavior
    if (value != null) this.renderer.setStyle(this.document.body, property, value, RendererStyleFlags2.DashCase);
    else this.renderer.removeStyle(this.document.body, property);

    this.properties.patch({ [property]: value });
  }
  getProperty(property: ThemeProperty): string | null {
    return this.properties.snapshot?.[property];
  }
}
