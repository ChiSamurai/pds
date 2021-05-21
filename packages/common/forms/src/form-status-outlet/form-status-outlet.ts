import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Inject,
  InjectionToken,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  StaticProvider,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, mapTo, takeUntil, tap } from 'rxjs/operators';
import { extractValidationErrors } from '../utils';
import { FormStatusPendingDef } from './form-status-pending-def';
import { FormStatusValidDef } from './form-status-valid-def';

export const FORM_ERROR_COMPONENT = new InjectionToken<any>('FORM_ERROR_COMPONENT');

export const FORM_PENDING_COMPONENT = new InjectionToken<any>('FORM_PENDING_COMPONENT');
export const FORM_PENDING_TEMPLATE = new InjectionToken<TemplateRef<any>>('FORM_PENDING_TEMPLATE');

export const FORM_VALID_COMPONENT = new InjectionToken<any>('FORM_VALID_COMPONENT');
export const FORM_VALID_TEMPLATE = new InjectionToken<TemplateRef<any>>('FORM_VALID_TEMPLATE');

export const FORM_ERROR_CODE = new InjectionToken<string>('FORM_ERROR_CODE');
export const FORM_ERROR_PARAMS = new InjectionToken<any>('FORM_ERROR_PARAMS');
export const FORM_ERROR_MESSAGE = new InjectionToken<string>('FORM_ERROR_MESSAGE');

export type FormErrorMessageFactory = (params: any) => string;

export interface FormErrorMessages {
  [errorCode: string]: FormErrorMessageFactory | string;
}

export const FORM_ERROR_MESSAGES = new InjectionToken<FormErrorMessages>('FORM_ERROR_MESSAGES');

@Component({
  selector: 'form-status-outlet',
  styles: ['form-status-outlet { display: block }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf="!!control && (!waitForTouch || control.touched)">
      <ng-container *ngIf="control.status === 'PENDING'; else invalidOrValidTemplate">
        <ng-container *ngIf="!!pendingComponent">
          <ng-container *ngComponentOutlet="pendingComponent; injector: pendingInjector"></ng-container>
        </ng-container>
        <ng-template #pendingTemplate>
          <ng-container *ngTemplateOutlet="pendingDef?.template"></ng-container>
        </ng-template>
      </ng-container>
      <ng-template #invalidOrValidTemplate>
        <ng-container *ngIf="control.status === 'INVALID'; else validTemplate">
          <ng-container *ngIf="!!errorComponent; else messageTemplate">
            <ng-container *ngComponentOutlet="errorComponent; injector: errorInjector"></ng-container>
          </ng-container>
          <ng-template #messageTemplate>{{ selectedErrorMessage }}</ng-template>
        </ng-container>
        <ng-template #validTemplate>
          <ng-container *ngIf="!!validComponent; else validDefTemplate">
            <ng-container *ngComponentOutlet="validComponent; injector: validInjector"></ng-container>
          </ng-container>
          <ng-template #validDefTemplate>
            <ng-container *ngTemplateOutlet="validDef?.template"></ng-container>
          </ng-template>
        </ng-template>
      </ng-template>
    </ng-container>
  `,
})
export class FormStatusOutlet implements OnChanges, OnInit, OnDestroy {
  private _validationErrors: ValidationErrors;
  private _control: AbstractControl;
  private _pendingSub: Subscription;
  private _invalidSub: Subscription;
  private _validSub: Subscription;
  private _waitForTouch = true;

  @ContentChild(FormStatusPendingDef, { static: true }) private _staticPendingDef: FormStatusPendingDef | null;
  @ContentChild(FormStatusPendingDef, { static: false }) private _dynamicPendingDef: FormStatusPendingDef | null;
  @ContentChild(FormStatusValidDef, { static: true }) private _staticValidDef: FormStatusValidDef | null;
  @ContentChild(FormStatusValidDef, { static: false }) private _dynamicValidDef: FormStatusValidDef | null;

  protected readonly ngDestroys = new Subject<void>();

  get pendingDef(): FormStatusPendingDef | null {
    return this._staticPendingDef || this._dynamicPendingDef;
  }
  get validDef(): FormStatusValidDef | null {
    return this._staticValidDef || this._dynamicValidDef;
  }

  @Input() select: string | number = 0;

  @Input()
  set control(value: AbstractControl) {
    this._control = value;
  }
  get control(): AbstractControl | null {
    return this._control || this.ngControl?.control;
  }

  @Input()
  set waitForTouch(value: boolean) {
    this._waitForTouch = coerceBooleanProperty(value);
  }
  get waitForTouch(): boolean {
    return this._waitForTouch;
  }

  get validationErrors(): ValidationErrors | null {
    return this.control && extractValidationErrors(this.control);
  }

  get selectedError(): [string, any] | null {
    if (this.validationErrors == null) return;

    const entries = Object.entries(this.validationErrors);
    if (typeof this.select === 'string') return entries.find(([code]) => code === this.select);
    else return entries[this.select];
  }
  get selectedErrorMessage(): string | null {
    if (this.selectedError == null) return;

    const [errorCode, params] = this.selectedError;
    const errorMessageOrFactory = this.errorMessages[errorCode];
    return typeof errorMessageOrFactory === 'function' ? errorMessageOrFactory(params) : errorMessageOrFactory;
  }

  get errorInjector(): Injector {
    const [errorCode, params] = this.selectedError;
    return this.createInjector([
      { provide: FORM_ERROR_CODE, useValue: errorCode },
      { provide: FORM_ERROR_PARAMS, useValue: params },
      {
        provide: FORM_ERROR_MESSAGE,
        useValue: this.selectedErrorMessage,
      },
    ]);
  }
  get pendingInjector(): Injector {
    return this.createInjector([{ provide: FORM_PENDING_TEMPLATE, useValue: this.pendingDef?.template }]);
  }
  get validInjector(): Injector {
    return this.createInjector([{ provide: FORM_VALID_TEMPLATE, useValue: this.validDef?.template }]);
  }

  constructor(
    protected injector: Injector,
    protected changeDetector: ChangeDetectorRef,
    @Inject(FORM_ERROR_MESSAGES) readonly errorMessages: /* @dynamic */ FormErrorMessages,
    @Optional() @Inject(FORM_ERROR_COMPONENT) readonly errorComponent?: any,
    @Optional() @Inject(FORM_PENDING_COMPONENT) readonly pendingComponent?: any,
    @Optional() @Inject(FORM_VALID_COMPONENT) readonly validComponent?: any,
    @Optional() protected readonly ngControl?: NgControl
  ) {}

  private _invalidateStatusSubs(): void {
    if (this._pendingSub != null && !this._pendingSub?.closed) this._pendingSub.unsubscribe();
    this._pendingSub = this.observeControlStatusChange('PENDING').subscribe();

    if (this._invalidSub != null && !this._invalidSub?.closed) this._invalidSub.unsubscribe();
    this._invalidSub = this.observeControlStatusChange('INVALID').subscribe(
      (control) => (this._validationErrors = extractValidationErrors(control))
    );

    if (this._validSub != null && !this._validSub?.closed) this._validSub.unsubscribe();
    this._validSub = this.observeControlStatusChange('VALID').subscribe(() => (this._validationErrors = null));
  }

  protected createInjector(providers: StaticProvider[]): Injector {
    return Injector.create({ parent: this.injector, providers });
  }
  protected observeControlStatusChange(status: 'VALID' | 'PENDING' | 'INVALID'): Observable<AbstractControl> {
    return this.control.statusChanges.pipe(
      takeUntil(this.ngDestroys),
      distinctUntilChanged(),
      filter((s) => s === status),
      tap(() => this.changeDetector.markForCheck()),
      tap(() => this.control.markAsTouched()),
      mapTo(this.control)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('controlOrName' in changes && this.control != null) this._invalidateStatusSubs();
  }
  ngOnInit() {
    if (this.control != null) this._invalidateStatusSubs();
  }
  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
