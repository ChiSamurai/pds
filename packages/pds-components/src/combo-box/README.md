# Combo Box

## Default Style

```html

<div>
  <label>Default value style</label>
  <pds-combo-box placeholder="Type something and hit enter..."></pds-combo-box>
</div>
```

## Tag Style

```html

<div>
  <label>Tag value style</label>
  <pds-combo-box placeholder="Type something and hit enter...">
    <pds-tag *pdsComboDef="let value">{{ value }}</pds-tag>
  </pds-combo-box>
</div>
```

## Default Style (readOnly)

```html

<div>
  <label>Readonly tag value style</label>
  <pds-combo-box [value]="[ 'foo', 'bar' ]" readOnly="true">
    <pds-tag *pdsComboDef="let value">{{ value }}</pds-tag>
  </pds-combo-box>
</div>
```
