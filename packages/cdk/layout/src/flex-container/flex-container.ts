import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { coerceCSSUnit } from '@vitagroup/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  FLEX_CONTAINER_STATE,
  FlexContainerState,
  MEDIA_FLEX_CONTAINER_STATES,
  MediaFlexContainerState,
} from './flex-container-state';

@Component({
  selector: 'fx-container, [fx-container]',
  styleUrls: ['./flex-container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-content></ng-content>
  `,
})
export class FlexContainer implements OnInit, OnDestroy {
  protected readonly ngDestroys = new Subject<void>();

  constructor(
    @Optional()
    @Inject(MEDIA_FLEX_CONTAINER_STATES)
    private _mediaStates: MediaFlexContainerState[],
    @Optional() @Inject(FLEX_CONTAINER_STATE) private _defaultState: FlexContainerState,
    protected readonly elementRef: ElementRef<HTMLElement>,
    protected readonly media: MediaObserver,
    protected readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this._defaultState != null) {
      this.setContainerState(this._defaultState);
    }
    if (this._mediaStates != null) {
      this.media
        .asObservable()
        .pipe(takeUntil(this.ngDestroys))
        .subscribe(() => this.checkMediaStates());
    }
  }
  ngOnDestroy(): void {
    this.clearContainerState();

    this.ngDestroys.next();
    this.ngDestroys.complete();
  }

  setContainerState(state: FlexContainerState): void {
    const maxWidth = coerceCSSUnit(state.maxWidth, 'px');
    const padding = coerceCSSUnit(state.padding, 'px');

    this._setStyle('max-width', maxWidth);
    this._setStyle('padding-right', padding);
    this._setStyle('padding-left', padding);
  }
  clearContainerState(): void {
    this._removeStyle('max-width');
    this._removeStyle('padding-right');
    this._removeStyle('padding-left');
  }

  checkMediaStateBreakpoints({ breakpoint }: MediaFlexContainerState): boolean {
    const aliases = Array.isArray(breakpoint) ? breakpoint : [breakpoint];
    return aliases.some((alias) => this.media.isActive(alias));
  }
  checkMediaStates(): boolean {
    let didMatchSomething = false;
    for (const state of this._mediaStates) {
      if (this.checkMediaStateBreakpoints(state)) {
        this.setContainerState(state);
        didMatchSomething = true;
        break;
      }
    }
    // Removes any relevant styling if the checking loop didn't get any match!
    if (!didMatchSomething) {
      this._removeStyle('max-width');
    }
    return didMatchSomething;
  }

  private _setStyle(style: string, value: any): void {
    this.renderer.setStyle(this.elementRef.nativeElement, style, value);
  }
  private _removeStyle(style: string): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, style);
  }
}
