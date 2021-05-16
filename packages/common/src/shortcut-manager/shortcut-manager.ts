import { ElementRef, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventUnlistener } from '../event-manager/event-manager-plugin';
import { ArrayBehaviorState } from '../rx/behavior-state';

export class ShortcutManager<T = any> {
  protected readonly unlistener = new ArrayBehaviorState<[string, EventUnlistener]>();

  get keystrokes(): string[] {
    return this.unlistener.snapshot.map(([keystroke]) => keystroke);
  }

  nativeElement: T;

  constructor(protected renderer: Renderer2, elementRef?: ElementRef<T> | T) {
    this.nativeElement = elementRef instanceof ElementRef ? elementRef.nativeElement : elementRef;
  }

  register(keystroke: string, listener: EventListener): EventUnlistener {
    let [target, keys] = keystroke?.split(':') as [any, string];
    if (!keys) {
      keys = target;
      target = this.nativeElement;
    }
    if (keys.includes('+')) {
      keys = keys.replace('+', '.');
    }
    const unlistener = this.renderer.listen(target, `keydown.${keys}`, listener);
    this.unlistener.push([keystroke, unlistener]);
    return unlistener;
  }
  unregister(keystroke: string): void {
    const index = this.unlistener.snapshot.findIndex(([ks]) => ks === keystroke);
    if (index >= 0) {
      this.unlistener.snapshot[index][1]();
      this.unlistener.removeAt(index);
    }
  }

  clear(): void {
    for (const [keystroke, unlisten] of this.unlistener.snapshot) unlisten();
    this.unlistener.reset();
  }

  asObservable(): Observable<string[]> {
    return this.unlistener.asObservable().pipe(map(() => this.keystrokes));
  }
}
