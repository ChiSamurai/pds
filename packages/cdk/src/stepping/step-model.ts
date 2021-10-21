import { AbstractControl } from '@angular/forms';
import { ArrayBehaviorState } from '@vitagroup/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type StepDirection = 'forwards' | 'backwards';
export type StepCanActivate = (direction: StepDirection, previous: Step) => Promise<boolean> | boolean;
export type StepCanDeactivate = (direction: StepDirection, next: Step) => Promise<boolean> | boolean;

export interface StepOptions {
  name?: string;
  /** Defines an optional form control to "bind" the step to */
  formControl?: AbstractControl;
  /**
   * Defines whether to ignore the validity of the {@link formControl}. The value can either be `true`, to fully ignore
   * the control validity during step activations or to a particular {@link StepDirection} to still be able to constrain
   * one direction to the validity. This field **will be ignored** if no {@link formControl} is present
   */
  ignoreValidity?: StepDirection | boolean;
  /**
   * Defines a list of predicate functions that resolves whether the {@link Step} can be activated or not. This
   * evaluation will always be executed when calling {@link StepModel} or {@link Step} functions
   */
  canActivate?: StepCanActivate[];
  /**
   * Defines a list of predicate functions that resolves whether the {@link Step} can be deactivated or not. This
   * evaluation will always be executed when calling {@link StepModel} or {@link Step} functions
   */
  canDeactivate?: StepCanDeactivate[];
}

export interface StepGuardOptions {
  ignoreValidity?: boolean;
}

export interface StepActivateOptions extends StepGuardOptions {
  skipGuards?: boolean;
}

export class Step {
  private _canActivate: StepCanDeactivate[];
  private _canDeactivate: StepCanDeactivate[];
  private _touched = false;
  private _done = false;

  readonly model: StepModel | null;

  formControl: AbstractControl | null;
  ignoreValidity: StepDirection | boolean = 'backwards';
  name: string | null;

  get isActive(): boolean {
    return this.model?.isActive(this);
  }
  get index(): number | null {
    return this.model?.indexOf(this);
  }

  /** Gets whether the step got touched, meaning it did activate at least once successfully */
  get touched(): boolean {
    return this._touched;
  }
  /** Gets whether the step is still untouched, meaning it did not activate once yet */
  get untouched(): boolean {
    return !this.touched;
  }

  /** Gets whether the step is done, meaning it did deactivate at least once forwards successfully */
  get done(): boolean {
    return this._done;
  }
  /** Gets whether the step is not done, meaning it did not deactivate once forwards successfully yet */
  get undone(): boolean {
    return !this.done;
  }

  get isFirst(): boolean {
    const first = this.model?.first;
    return first?.name === this.name || first?.index === this.index;
  }
  get isLast(): boolean {
    const last = this.model?.last;
    return last?.name === this.name || last?.index === this.index;
  }

  constructor(formControlOrOptions: AbstractControl | StepOptions, model?: StepModel) {
    if (formControlOrOptions instanceof AbstractControl) this.formControl = formControlOrOptions;
    else {
      const { formControl, ignoreValidity, canActivate, canDeactivate } = formControlOrOptions || {};

      this._canActivate = canActivate;
      this._canDeactivate = canDeactivate;

      this.ignoreValidity = ignoreValidity;
      this.formControl = formControl;
    }

    this.model = model;
  }

  async canActivate(direction: StepDirection, previous: Step, options?: StepGuardOptions): Promise<boolean> {
    const can = await this.checkGuard('canActivate', direction, previous, options);
    this._touched = this._touched || can;
    return can;
  }
  async canDeactivate(direction: StepDirection, next: Step, options?: StepGuardOptions): Promise<boolean> {
    const can = await this.checkGuard('canDeactivate', direction, next, options);
    this._done = this._done || (this.isLast && can) || (direction === 'forwards' && can);
    return can;
  }

  async activate(options?: StepActivateOptions) {
    await this.model?.activate(this, options);
  }

  markAsDone(): void {
    this._done = true;
  }
  markAsUndone(): void {
    this._done = false;
  }

  markAsTouched(): void {
    this._touched = true;
  }
  markAsUntouched(): void {
    this._touched = false;
  }

  protected async checkGuard(
    key: 'canActivate' | 'canDeactivate',
    direction: StepDirection,
    step: Step,
    options?: StepGuardOptions
  ): Promise<boolean> {
    const isPromise = (x) => x instanceof Promise;
    const predicateKey = `_${key}`;

    // resolve all return values of the given `canDeactivate` functions
    let results = this?.[predicateKey]?.map((predicate) => predicate(direction, step));
    // filter out any occurring promise "instances"
    const promised = results?.filter((value) => isPromise(value));
    // re-assign the actual already available results to the leta
    results = results?.filter((value) => !isPromise(value)) || [];
    // wait for all promised results and merge them into the actual result array
    const promisedResults = promised?.length ? await Promise.all(promised) : [];
    results = [...promisedResults, ...results];

    let ignoreValidity = this.ignoreValidity || options?.ignoreValidity;
    ignoreValidity = key !== 'canDeactivate' || ignoreValidity === true || ignoreValidity === direction || !direction;

    if (!ignoreValidity) {
      this.formControl?.updateValueAndValidity({ onlySelf: true });
    }
    const isValid = ignoreValidity || this.formControl.valid;

    return results.every((value) => !!value) && isValid;
  }
}

export class StepActivationError extends Error {
  constructor(step: Step, message?: string) {
    super(`Failed to activate step "${step.name || step.index}"` + (message ? `. ${message}` : ''));
  }
}

export function resolveStepDirection(previous: Step, next: Step): StepDirection {
  if (!previous || !next) return null;
  if (previous.model !== next.model) throw new Error(`The steps are not contained within the same model!`);
  return previous.index > next.index ? 'backwards' : 'forwards';
}

export type StepModelInput =
  | Array<string | AbstractControl | StepOptions>
  | Record<string, AbstractControl | StepOptions>;

export class StepModel extends Observable<Step> implements Iterable<Step> {
  protected readonly activeSubject = new BehaviorSubject<Step>(null);

  readonly children = new ArrayBehaviorState<Step>();

  get next(): Step | null {
    return this.children.snapshot?.[this.indexOf(this.active) + 1];
  }
  get previous(): Step | null {
    return this.children.snapshot?.[this.indexOf(this.active) - 1];
  }
  get active(): Step {
    return this.activeSubject.getValue();
  }

  get first(): Step {
    return this.children.first;
  }
  get last(): Step {
    return this.children.last;
  }

  constructor(model: StepModelInput) {
    super((subscriber) => this.activeSubject.subscribe(subscriber));

    let children;
    if (Array.isArray(model)) {
      children = model.map((nameOrControlOrOptions) => {
        if (typeof nameOrControlOrOptions === 'string') {
          const step = new Step(null, this);
          step.name = nameOrControlOrOptions;
          return step;
        } else return new Step(nameOrControlOrOptions, this);
      });
    } else {
      children = Object.entries(model).map(([name, controlOrOptions]) => {
        const step = new Step(controlOrOptions, this);
        step.name = name;
        return step;
      });
    }
    this.children.reset(...children);

    this.activate(this.children.first, { ignoreValidity: true, skipGuards: true });
  }

  get(stepNameOrIndex: string | number): Step | null {
    return typeof stepNameOrIndex === 'string'
      ? this.children.snapshot?.find((step) => step.name === stepNameOrIndex)
      : this.children.snapshot?.[stepNameOrIndex];
  }

  indexOf(stepOrName: Step | string): number {
    stepOrName = stepOrName instanceof Step ? stepOrName : this.get(stepOrName);
    return this.children.snapshot.indexOf(stepOrName);
  }

  isActive(stepOrNameOrIndex: Step | string | number): boolean {
    const step = stepOrNameOrIndex instanceof Step ? stepOrNameOrIndex : this.get(stepOrNameOrIndex);
    return this.active === step;
  }

  async activate(stepOrNameOrIndex: Step | string | number, options?: StepActivateOptions) {
    if (typeof stepOrNameOrIndex === 'string' || typeof stepOrNameOrIndex === 'number') {
      stepOrNameOrIndex = this.get(stepOrNameOrIndex);
    }
    if (stepOrNameOrIndex == null) return;

    // todo: add a constraint mechanism that checks for linear step activation!
    // const offset: number = stepOrNameOrIndex.index - this.active.index;
    // if (Math.abs(offset) > 1) ...

    if (!options?.skipGuards) {
      const direction: StepDirection = resolveStepDirection(this.active, stepOrNameOrIndex);

      if (this.active && !(await this.active.canDeactivate(direction, stepOrNameOrIndex, options)))
        throw new StepActivationError(
          stepOrNameOrIndex,
          `Unable to deactivate "${this.active.name || this.active.index}". Deactivation constraint not met!`
        );
      if (!(await stepOrNameOrIndex.canActivate(direction, this.active, options)))
        throw new StepActivationError(stepOrNameOrIndex, 'Activation constraint not met!');
    }

    this.activeSubject.next(stepOrNameOrIndex);
  }

  [Symbol.iterator](): Iterator<Step> {
    return this.children.snapshot?.[Symbol.iterator]();
  }
}
