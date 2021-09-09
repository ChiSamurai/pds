# Dialog Overlay

The CDK `DialogOverlayModule` aims to simplify the handling of dialog behavior on a service layer level.

## Usage

You can use any component type to instantiate a new dialog overlay, **but** you have to make sure that the given component type exists in the related module scope as a declaration!

```typescript
@Component()
export class AppComponent implements OnInit {
  constructor(protected dialogOverlay: DialogOverlay) {
  }

  async ngOnInit() {
    const confirmed = await this.dialogOverlay.create(ConfirmDialogComponent, {
      props: {
        message: `Do you like the app?`,
        options: [ 'yes', 'no' ]
      }
    }).toPromise();
  }
}
```

## Building a Dialog Component

Any component can technically be used as a dialog overlay. Whenever a component is instantiated as such, it will gain access to its own `DialogRef` provider that may be used to further control the dialog overlay behavior from within an instance.

```typescript
@Component({
  selector: 'confirm-dialog',
  template: `
    <dialog>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <hr>
      <button *ngFor="let option of options" (click)="dialog.dispose(option)">
        {{ option | titlecase }}
      </button>
    </dialog>
  `
})
export class ConfirmDialogComponent {
  @Input() title?: string;
  @Input() message: string;
  @Input() options: string[];

  constructor(readonly dialog: DialogRef) {
  }
}
```
