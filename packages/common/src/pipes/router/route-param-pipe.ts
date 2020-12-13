import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({ name: 'routeParam' })
export class RouteParamPipe implements PipeTransform {
  constructor(protected route: ActivatedRoute) {
  }

  transform(paramKey: string): Observable<any | null> {
    return this.route.params.pipe(
      map((params) => params[ paramKey ])
    );
  }
}

@NgModule({
  declarations: [ RouteParamPipe ],
  exports: [ RouteParamPipe ]
})
export class RouteParamPipeModule {
}
