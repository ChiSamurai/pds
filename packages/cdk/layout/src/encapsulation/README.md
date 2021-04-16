```typescript
@Component({
  selector: 'paragraph',
  template: `<ng-content></ng-content>`
})
export class ParagraphComponent {
}

export const PARAGRAPH_ENCAPSULATION_PROVIDER: Provider = {
  provide: TEMPLATE_ENCAPSULATIONS,
  useValue: { name: 'p', container: ParagraphComponent },
  multi: true
};
```
```html
<ng-container *encapsulate="'p'">Hello World!</ng-container>
```

_Output_
```html
<paragraph>Hello World!</paragraph>
```
