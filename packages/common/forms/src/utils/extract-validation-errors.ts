import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

/** Extracts all {@link ValidationErrors} recursively from the given {@link AbstractControl} instance */
export function extractValidationErrors(control: AbstractControl): ValidationErrors | null {
  let errors: ValidationErrors = {};
  if (control instanceof FormGroup) {
    for (const [key, innerControl] of Object.entries(control?.controls)) {
      const innerErrors = extractValidationErrors(innerControl);
      if (innerErrors != null) errors = { ...errors, [key]: innerErrors };
    }
  } else if (control instanceof FormArray) {
    for (let i = 0, l = control.length; i <= l; i++) {
      const innerErrors = extractValidationErrors(control.at(i));
      if (innerErrors != null) errors = { ...errors, [i]: innerErrors };
    }
  } else if (control instanceof AbstractControl) {
    if (control.errors != null) errors = { ...errors, ...control.errors };
  }
  return Object.entries(errors).length > 0 ? errors : null;
}
