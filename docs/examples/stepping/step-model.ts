import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StepModel } from '@vitagroup/cdk';

const { required } = Validators;

export class StepModelExample {
  formGroup = new FormGroup({
    first: new FormControl(null, required),
    second: new FormControl(),
    third: new FormControl(null, required),
    fourth: new FormControl(),
  });

  steps = new StepModel({
    first: this.formGroup.controls.first,
    second: this.formGroup.controls.second,
    third: this.formGroup.controls.third,
    fourth: this.formGroup.controls.fourth,
  });
}
