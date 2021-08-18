## TextBox with dropdown & filter

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

## Single selection dropdown

```html

<div>
  <label>Single selection behavior</label>
  <pds-select-box placeholder="Select one option...">
    <pds-select-list mode="single">
      <pds-select-option [value]="'foo'">foo</pds-select-option>
      <pds-select-option [value]="'bar'">bar</pds-select-option>
    </pds-select-list>
  </pds-select-box>
</div>
```

## Single selection dropdown (tag style) _with autocomplete_

```html

<div>
  <label>Combo box with single auto complete selection</label>
  <pds-combo-box [pdsInputDropdown]="comboBoxSingleDropdown" placeholder="Type something an hit enter...">
    <pds-tag *pdsComboDef="let value">{{ value }}</pds-tag>
  </pds-combo-box>

  <pds-dropdown #comboBoxSingleDropdown pdsInputDropdownDef>
    <pds-select-list #selectList3>
      <ng-container
        *ngIf="(['single option 1', 'single option 2', 'single option 3', 'single option 4'] | pdsInputFilter) as filteredOptions">
        <ng-container *ngIf="filteredOptions?.length; else noMatchTemplate">
          <pds-select-option *ngFor="let option of filteredOptions" [value]="option">
            <pds-check-box [checked]="selectList3.isSelected(option)">
              <label>{{ option }}</label>
            </pds-check-box>
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

## Multi selection dropdown

```html

<div>
  <label>Multi selection behavior</label>
  <pds-select-box placeholder="Select options...">
    <pds-select-list mode="multiple">
      <pds-select-option [value]="'foo'">foo</pds-select-option>
      <pds-select-option [value]="'bar'">bar</pds-select-option>
    </pds-select-list>
  </pds-select-box>
</div>
```

## Multi selection dropdown (tag style)

```html

<div>
  <label>Tag value style with multi selection behavior</label>
  <pds-select-box placeholder="Select options...">
    <pds-tag *pdsSelectDef="let value">{{ value }}</pds-tag>
    <pds-select-list mode="multiple">
      <pds-select-option [value]="'foo'">foo</pds-select-option>
      <pds-select-option [value]="'bar'">bar</pds-select-option>
    </pds-select-list>
  </pds-select-box>
</div>
```

## Multi selection _readonly_ dropdown (tag style)

```html

<div>
  <label>Read only tag value style</label>
  <pds-select-box [value]="[ 'foo', 'bar' ]" readOnly="true">
    <pds-tag *pdsSelectDef="let value">{{ value }}</pds-tag>
    <pds-select-list mode="multiple">
      <pds-select-option [value]="'foo'">foo</pds-select-option>
      <pds-select-option [value]="'bar'">bar</pds-select-option>
    </pds-select-list>
</div>
```

## Multi selection dropdown (tag style) _with autocomplete_

```html

<div>
  <label>Combo box with single auto complete selection</label>
  <pds-combo-box [pdsInputDropdown]="comboBoxSingleDropdown" placeholder="Type something an hit enter...">
    <pds-tag *pdsComboDef="let value">{{ value }}</pds-tag>
  </pds-combo-box>

  <pds-dropdown #comboBoxSingleDropdown pdsInputDropdownDef>
    <pds-select-list #selectList3>
      <ng-container
        *ngIf="(['single option 1', 'single option 2', 'single option 3', 'single option 4'] | pdsInputFilter) as filteredOptions">
        <ng-container *ngIf="filteredOptions?.length; else noMatchTemplate">
          <pds-select-option *ngFor="let option of filteredOptions" [value]="option">
            <pds-check-box [checked]="selectList3.isSelected(option)">
              <label>{{ option }}</label>
            </pds-check-box>
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

