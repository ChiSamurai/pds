import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DEFAULT_DOCUMENTATION_TABS } from '../../base-documentation/base-documentation.component';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'pds-app-form-status-outlet-documentation',
  templateUrl: './form-status-outlet-documentation.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormStatusOutletDocumentationComponent {
  readonly DEFAULT_DOCUMENTATION_TABS = DEFAULT_DOCUMENTATION_TABS;
  exampleFormGroup: FormGroup;

  constructor(protected fb: FormBuilder) {
    this.exampleFormGroup = this.fb.group({
      myInput: [null, Validators.required, this.dummyValidator]
    });
    console.log(this.exampleFormGroup);
  }

  dummyValidator({value}: AbstractControl): Observable<ValidationErrors | null> {
    return of(value < 10 ? null : {tooBig: true} as ValidationErrors).pipe(
      delay(2000)
    );
  }


  getInputStyle() {
    const controlState = this.exampleFormGroup.get('myInput').status;
    let colorVar = 'success';
    switch (controlState) {
      case 'PENDING':
        colorVar = 'info-lighter';
        break;
      case 'INVALID':
        colorVar = 'error';
        break;
    }
    return {backgroundColor: 'var(--' + colorVar + ')'};
  }
}
