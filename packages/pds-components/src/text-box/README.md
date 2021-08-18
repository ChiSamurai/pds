## Simple Text Box

### no icon

```html

<pds-text-box placeholder="Type something...">
  <svg-icon name="search" pdsBefore></svg-icon>
</pds-text-box>
```

### icons at start, end & both

```html

<pds-text-box [ngClass]="elementState" placeholder="Placeholder...">
  <svg-icon name="search" pdsBefore></svg-icon>
</pds-text-box>
```

```html

<pds-text-box [ngClass]="elementState" placeholder="Placeholder...">
  <svg-icon name="search" pdsAfter></svg-icon>
</pds-text-box>
```

```html

<pds-text-box [ngClass]="elementState" placeholder="Placeholder...">
  <svg-icon name="search" pdsBefore></svg-icon>
  <svg-icon name="info" pdsAfter></svg-icon>
</pds-text-box>

```

## Text Box with label

```html

<div>
  <label>Label2</label>
  <pds-text-box [ngClass]="elementState" placeholder="Placeholder...">
    <svg-icon name="search" pdsBefore></svg-icon>
    <svg-icon name="info" pdsAfter></svg-icon>
  </pds-text-box>
</div>

```

## Text Box with dropdown & filter

you can attach a dropdown with the selectable options to a textbox, for example to use it as a search field

```html

<div>
  <pds-text-box [pdsInputDropdown]="searchDropdown" placeholder="Type something...">
    <svg-icon name="search" pdsBefore></svg-icon>
  </pds-text-box>

  <pds-dropdown #searchDropdown pdsInputDropdownDef>
    <pds-select-list>
      <ng-container *ngIf="['option 1', 'option 2', 'option 3', 'option 4'] | pdsInputFilter as filteredOptions">
        <ng-container *ngIf="filteredOptions?.length; else noMatchTemplate">
          <pds-select-option *ngFor="let option of filteredOptions" [value]="option">
            {{ option }}
          </pds-select-option>
        </ng-container>
      </ng-container>
      <ng-template #noMatchTemplate>
        <pds-select-option disabled="true">No matches</pds-select-option>
      </ng-template>
    </pds-select-list>
  </pds-dropdown>
</div>
```
