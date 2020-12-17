# CDK Overlay

```html
<p>Lorem ipsum dolor <span [tooltip]="tooltip">sit amet</span>. Cedere est situm loris set arum</p>
<p>Lorem ipsum dolor <span tooltip="Hello World">sit amet</span>. Cedere est situm loris set arum</p>

<pds-tooltip #tooltip>Hello World</pds-tooltip>
<pds-flyout #flyout>Hello World</pds-flyout>
<pds-profile-flyout #profileFlyout>Hello World</pds-profile-flyout>
<!-- ... -->
```

```html
<a [dropdown]="linkDropdown" dropdownBehavior="toggle,focus"></a>

<pds-dropdown #linkDropdown>
  <ng-container *ngFor="let link of links">
    <pds-dropdown-option [routerLinkOrHref]="link" routerLinkActive="active">
      {{ link.name }}
    </pds-dropdown-option>
  </ng-container>
</pds-dropdown>
```

```html
<input [formControl]="control" [autoComplete]="autoCompleteDropdown" />

<pds-dropdown #autoCompleteDropdown>
  <ng-container *ngFor="let option of options">
    <pds-dropdown-option [autoCompleteValue]="option.value" autoCompleteFocus="focus">
      {{ option.displayName }}
    </pds-dropdown-option>
  </ng-container>
</pds-dropdown>
```
