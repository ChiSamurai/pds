import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { PrimitiveBehaviorState } from '@vitagroup/common';
import { StepDef } from './step-def';

@Component({
  selector: 'step-layout',
  styles: ['step-layout { display: block; width: 100% }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="activeStep as step">
      <ng-container *ngTemplateOutlet="step?.template"></ng-container>
    </ng-container>
  `,
})
export class StepLayout {
  @ContentChildren(StepDef)
  protected readonly steps: QueryList<StepDef>;
  protected readonly indexState = new PrimitiveBehaviorState<number>(0);

  get activeStep(): StepDef {
    const i = this.indexState.snapshot;
    return this.steps.find((step, stepIndex) => step.order === i || stepIndex === i);
  }
  get activeIndex(): number {
    return this.indexState.snapshot;
  }

  get count(): number {
    return this.steps?.length || 0;
  }

  get isFirstStep(): boolean {
    return this.indexState.snapshot === 0;
  }
  get isLastStep(): boolean {
    return !this.steps?.length || this.indexState.snapshot === this.steps.length - 1;
  }

  @Output() readonly stepChanges = new EventEmitter<StepDef>();

  constructor(protected changeDetectorRef: ChangeDetectorRef) {}

  isActive(index: number): boolean {
    return this.indexState.snapshot === index;
  }

  activate(index: number): void {
    // for now we always allow activations that are below the active index value, because we don't
    // want to block jumping to a step that already was handled beforehand
    const isLowerThanActiveIndex = index < this.activeIndex;
    if (isLowerThanActiveIndex || this.activeStep?.canContinue) {
      this.indexState.patch(index);
      this.stepChanges.emit(this.activeStep);
    }
    this.changeDetectorRef.detectChanges();
  }
  next(): void {
    if (!this.isLastStep) {
      this.activate(this.activeIndex + 1);
    } else {
      this.activate(0);
    }
  }
  previous(): void {
    if (!this.isFirstStep) {
      this.activate(this.activeIndex - 1);
    } else {
      this.activate(this.count - 1);
    }
  }
}
