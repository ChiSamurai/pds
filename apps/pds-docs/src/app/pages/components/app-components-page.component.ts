import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pds-app-components-page',
  styleUrls: ['./app-components-page.components.scss'],
  templateUrl: './app-components-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponentsPageComponent {
  readonly options = [
    'Ta Tyree',
    'Tennie Tawil',
    'Shannan Sessions',
    'Garth Gallagher',
    'Beula Bodiford',
    'Tyler Turlington',
    'Annita Arbeiter',
    'Erich Estes',
    'Marilu Mcdade',
    'Edgar Edie',
    'Liza Lauber',
    'Leora Luse',
    'Vivian Violette',
    'Doreen Dupuy',
    'Audie Almeida',
  ];
}
