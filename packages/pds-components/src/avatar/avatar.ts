import { Component, HostBinding, Input, NgModule, ViewEncapsulation } from '@angular/core';

export type PdsAvatarSize = 'lg' | 'md' | 'sm';

@Component({
  selector: 'pds-avatar',
  styleUrls: ['avatar.scss'],
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.tabindex]': '0' },
  template: `
    <ng-content select="img, svg-icon"></ng-content>
  `,
})
export class PdsAvatar {
  @Input() size: PdsAvatarSize = 'md';

  @HostBinding('style.--avatar-size')
  get cssSizeVar(): string {
    return `var(--avatar-size-${this.size || 'md'})`;
  }

  @HostBinding('style.--avatar-icon-size')
  get cssIconSizeVar(): string {
    return `var(--avatar-icon-size-${this.size})`;
  }
}

@NgModule({
  declarations: [PdsAvatar],
  exports: [PdsAvatar],
})
export class PdsAvatarModule {}
