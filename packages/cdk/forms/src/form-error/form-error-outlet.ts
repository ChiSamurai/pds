import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  InjectionToken,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormGroupDirective, ValidationErrors } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, mapTo, takeUntil, tap } from 'rxjs/operators';
import { extractValidationErrors } from '../utils';

export const FORM_ERROR_COMPONENT = new InjectionToken<any>('FORM_ERROR_COMPONENT');
export const FORM_PENDING_COMPONENT = new InjectionToken<any>('FORM_PENDING_COMPONENT');

export const FORM_ERROR_CODE = new InjectionToken<string>('FORM_ERROR_CODE');
export const FORM_ERROR_PARAMS = new InjectionToken<any>('FORM_ERROR_PARAMS');
export const FORM_ERROR_MESSAGE = new InjectionToken<string>('FORM_ERROR_MESSAGE');

export type FormErrorMessageFactory = (params: any) => string;

export interface FormErrorMessages {
  [ errorCode: string ]: FormErrorMessageFactory | string;
}

export const FORM_ERROR_MESSAGES = new InjectionToken<FormErrorMessages>('FORM_ERROR_MESSAGES');

@Component({
  selector: 'form-error-outlet',
  styles: [ 'form-error-outlet { display: block }' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-container *ngIf='control != null && control.touched'>
      <ng-container *ngIf="control.status === 'PENDING'; else errorTemplate">
        <ng-container *ngComponentOutlet='pendingComponent'></ng-container>
      </ng-container>
      <ng-template #errorTemplate>
        <ng-container *ngIf="control.status === 'INVALID'">
          <ng-container *ngIf='errorComponent != null; else messageTemplate'>
            <ng-container *ngComponentOutlet='errorComponent; injector: errorInjector'></ng-container>
          </ng-container>
          <ng-template #messageTemplate>{{ selectedErrorMessage }}</ng-template>
        </ng-container>
      </ng-template>
    </ng-container>`
})
export class FormErrorOutlet implements OnChanges, OnInit, OnDestroy {
  private _validationErrors: ValidationErrors;
  private _pendingSub: Subscription;
  private _invalidSub: Subscription;
  private _validSub: Subscription;

  protected readonly ngDestroys = new Subject<void>();

  @Input('for') controlOrName: AbstractControl | Array<string | number> | string;

  @Input() select: string | number = 0;

  get control(): AbstractControl | null {
    if (this.controlOrName instanceof AbstractControl)
      return this.controlOrName;
    else if (this.formGroupDirective != null)
      return this.formGroupDirective.form.get(this.controlOrName);
  }

  get validationErrors(): ValidationErrors | null {
    return this.control && extractValidationErrors(this.control);
  }

  get selectedError(): [ string, any ] | null {
    if (this.validationErrors == null) return;

    const entries = Object.entries(this.validationErrors);
    if (typeof this.select === 'string')
      return entries.find(([ code ]) => code === this.select);
    else return entries[ this.select ];
  }

  get selectedErrorMessage(): string | null {
    if (this.selectedError == null) return;

    const [ errorCode, params ] = this.selectedError;
    const errorMessageOrFactory = this.errorMessages[ errorCode ];
    return typeof errorMessageOrFactory === 'function'
      ? errorMessageOrFactory(params)
      : errorMessageOrFactory;
  }

  get errorInjector(): Injector {
    const [ errorCode, params ] = this.selectedError;
    return Injector.create({
      parent: this.injector,
      providers: [
        { provide: FORM_ERROR_CODE, useValue: errorCode },
        { provide: FORM_ERROR_PARAMS, useValue: params },
        {
          provide: FORM_ERROR_MESSAGE,
          useValue: this.selectedErrorMessage
        }
      ]
    });
  }

  constructor(
    protected injector: Injector,
    protected changeDetector: ChangeDetectorRef,
    @Inject(FORM_ERROR_MESSAGES) readonly errorMessages: /* @dynamic */ FormErrorMessages,
    @Optional() @Inject(FORM_ERROR_COMPONENT) readonly errorComponent: any,
    @Optional() @Inject(FORM_PENDING_COMPONENT) readonly pendingComponent: any,
    @Optional() protected readonly formGroupDirective: FormGroupDirective
  ) {
  }

  private _invalidateStatusSubs(): void {
    if (this._pendingSub != null && !this._pendingSub?.closed) this._pendingSub.unsubscribe();
    this._pendingSub = this.observeControlStatusChange('PENDING').subscribe();

    if (this._invalidSub != null && !this._invalidSub?.closed) this._invalidSub.unsubscribe();
    this._invalidSub = this.observeControlStatusChange('INVALID')
      .subscribe(control => this._validationErrors = extractValidationErrors(control));

    if (this._validSub != null && !this._validSub?.closed) this._validSub.unsubscribe();
    this._validSub = this.observeControlStatusChange('VALID')
      .subscribe(() => this._validationErrors = null);
  }

  protected observeControlStatusChange(status: 'VALID' | 'PENDING' | 'INVALID'): Observable<AbstractControl> {
    return this.control.statusChanges.pipe(
      takeUntil(this.ngDestroys),
      filter(s => s === status),
      tap(() => this.changeDetector.detectChanges()),
      mapTo(this.control)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('controlOrName' in changes && this.control != null)
      this._invalidateStatusSubs();
  }

  ngOnInit() {
    if (this.control != null)
      this._invalidateStatusSubs();
  }

  ngOnDestroy() {
    this.ngDestroys.next();
    this.ngDestroys.complete();
  }
}
