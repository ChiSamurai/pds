import { Component, ViewEncapsulation } from '@angular/core';
import { AsyncValidatorFn, FormControl, Validators } from '@angular/forms';
import { DialogOverlay } from '@vitagroup/cdk';
import { AppDialogComponent } from '../../components/app-dialog/app-dialog.component';
import { AppGuidesService } from '../../services/app-guides.service';

@Component({
  selector: 'pds-app-components-page',
  styleUrls: ['./app-components-page.components.scss'],
  templateUrl: './app-components-page.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponentsPageComponent {
  readonly fooValidator: AsyncValidatorFn = (control) =>
    new Promise((resolve) => setTimeout(() => resolve(null), 2000));

  /* eslint-disable @typescript-eslint/member-ordering */
  readonly formControl = new FormControl(null, [Validators.required], [this.fooValidator]);

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

  constructor(protected dialog: DialogOverlay, readonly appGuides: AppGuidesService) {}

  openModal(): void {
    this.dialog.create(AppDialogComponent).subscribe();
  }
}
