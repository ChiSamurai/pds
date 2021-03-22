import { Directive } from '@angular/core';
import { PrimitiveBehaviorState } from '@vitagroup/common';
import { ControlInputAccessor } from './control-input-accessor';

@Directive()
export abstract class InputDropdownDefBase implements ControlInputAccessor {
  readonly input = new PrimitiveBehaviorState<string>();
}
