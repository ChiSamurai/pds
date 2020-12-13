import { Injectable } from '@angular/core';
import { PrimitiveBehaviorState } from '@vitagroup/common';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingState {
  protected state = new PrimitiveBehaviorState<boolean>();

  readonly starts: Observable<true> = this.asObservable()
    .pipe(filter<true>((b) => b));
  readonly stops: Observable<false> = this.asObservable()
    .pipe(filter<false>((b) => !b));

  start(): void {
    this.state.patch(true);
  }
  stop(): void {
    this.state.patch(false);
  }

  asObservable(): Observable<boolean> {
    return this.state.asObservable();
  }
}
