import { ElementState } from './element-state';

// todo(@janunld): consider a platform independent token for this check?!
function targetInside(target: any, element: any): boolean {
  return (element as Node).contains(target as Node);
}

export class ElementFocusState<T = any> extends ElementState<T> {
  // ancestors will be used to ignore unsets if they appear as target of the document:mousedown unset listener
  readonly ancestors = new Set<any>();

  className = 'focus';

  protected configureEventListener() {
    this.setOn('mousedown');
    this.unsetOn('document:mousedown', (e) => {
      const insideAncestor =
        this.ancestors.size && Array.from(this.ancestors).some((ancestor) => targetInside(e.target, ancestor));
      return this.isSet && !targetInside(e.target, this.nativeElement) && !insideAncestor;
    });
  }
}
