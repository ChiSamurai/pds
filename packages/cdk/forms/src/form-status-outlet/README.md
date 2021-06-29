# FormStatusOutlet

## Form Error Messages

```typescript
const MY_FORM_ERRORS: FormErrorMessages = {
  required: $localize`Required: Please enter a value`,
};
```

```html
<form [formGroup]="formGroup">
  <input type="text" formControlName="foo" />

  <form-status-outlet formControlName="foo"></form-status-outlet>
  <!-- or -->
  <form-status-outlet formControlName="foo">
    <ng-template formStatusPendingDef>Looking for any existing foos...</ng-template>
    <ng-template formStatusValidDef>Foo is available!</ng-template>
  </form-status-outlet>
</form>
```
