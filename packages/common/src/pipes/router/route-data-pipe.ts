import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({ name: 'routeData' })
export class RouteDataPipe implements PipeTransform {
  constructor(protected route: ActivatedRoute) {
  }

  transform(dataKey: string): Observable<any | null> {
    return this.route.data.pipe(
      map((data) => data[ dataKey ])
    );
  }
}

@NgModule({
  declarations: [ RouteDataPipe ],
  exports: [ RouteDataPipe ]
})
export class RouteDataPipeModule {
}
