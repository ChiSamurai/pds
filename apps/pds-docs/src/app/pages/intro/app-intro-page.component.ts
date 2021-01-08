import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-app-intro-page',
  styleUrls: ['app-intro-page.component.scss'],
  templateUrl: 'app-intro-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppIntroPageComponent {
  readonly guideShortcuts = [
    {
      headline: 'Getting Started',
      linkUrl: '/guides/getting-started',
      linkLabel: `Let's go`,
      description: 'Taking first steps with the PDS ecosystem. Mainly boilerplating',
    },
    {
      headline: 'Hello World',
      linkUrl: '/guides/hello-world',
      linkLabel: 'Inspect',
      description: 'Exemplary application, integrating some of the main PDS principles.',
    },
    {
      headline: 'Page Layout',
      linkUrl: '/guides/page-layout',
      linkLabel: 'Read',
      description: 'A brief summary of the page layout features and possibilities.',
    },
    {
      headline: 'Navigation',
      linkUrl: '/guides/layout',
      linkLabel: 'Read',
      description: 'A brief summary of the navigation features and possibilities.',
    },
    {
      headline: 'SVG Icons',
      linkUrl: '/guides/svg-icons',
      linkLabel: 'Read',
      description: 'A brief summary of the svg-icon features and possibilities.',
    },
    {
      headline: 'SCSS',
      linkUrl: '/guides/scss',
      linkLabel: 'Read',
      description: 'A brief summary of the pds-css features and possibilities.',
    },
  ];
}
