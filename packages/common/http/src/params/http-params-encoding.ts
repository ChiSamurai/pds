import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParameterCodec,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { Observable } from 'rxjs';

export const HTTP_PARAM_CODEC = new InjectionToken<HttpParameterCodec>('HTTP_PARAM_CODEC');

@Injectable()
export class HttpParamsEncodingInterceptor implements HttpInterceptor {
  constructor(
    @Optional() @Inject(HTTP_PARAM_CODEC)
    readonly codec: /* @dynamic */ HttpParameterCodec
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = new HttpParams({
      fromString: req.params.toString(),
      encoder: this.codec
    });
    return next.handle(req.clone({ params }));
  }
}

export interface HttpParamsEncodingModuleConfig {
  encoder: HttpParameterCodec;
}

@NgModule()
export class HttpParamsEncodingModule {
  static forRoot(config: HttpParamsEncodingModuleConfig): ModuleWithProviders<HttpParamsEncodingModule> {
    return {
      ngModule: HttpParamsEncodingModule, providers: [
        {
          provide: HTTP_PARAM_CODEC,
          useValue: config.encoder
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpParamsEncodingInterceptor,
          multi: true
        }
      ]
    };
  }
}
