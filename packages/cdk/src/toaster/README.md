# Toaster

```html
<ng-template #templateRef let-toast="toast">
  <pds-banner>
    <svg-icon name="info" pdsBefore></svg-icon>
    <span>Hello World!</span>
    <button class="small" pdsAfter (click)="toast.dispose()">
      Hey!
    </button>
  </pds-banner>
</ng-template>
```

```typescript
const toaster = inject(Toaster);

let toast = toaster.push(templateRef);
toast = toaster.push('Hey', { type: 'info' });
toast = toaster.pushInfo('Hey');
toast = toaster.pushError('Something broke');

toast = toaster.push('We are using Cookies', { type: 'confirm' });
toast.pop().then(didConfirm => console.log(`didConfirm: ${didConfirm}`));
```

```html
<pds-banner class="confirm" *toastDef="let message as 'confirm'; let toast = toast">
  <svg-icon name="question-mark" pdsBefore></svg-icon>
  <span>{{ message }}</span>
  <button class="small" pdsAfter (click)="toast.dispose(false)">
    Decline
  </button>
  <button class="small" pdsAfter (click)="toast.dispose(false)">
    Accept
  </button>
</pds-banner>
```
