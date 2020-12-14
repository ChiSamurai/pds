```typescript
@Component({
  selector: 'paragraph',
  template: `<ng-container *encapsulateTemplateOutlet></ng-container>`
})
export class ParagraphComponent {
}

@Component({
  selector: 'text',
  template: `<ng-container *encapsulateTemplateOutlet></ng-container>`
})
export class TextComponent {
}

export const PARAGRAPH_ENCAPSULATION_PROVIDER: Provider = {
  provide: TEMPLATE_ENCAPSULATIONS,
  useValue: { name: 'p', container: ParagraphComponent },
  multi: true
};
export const TEXT_ENCAPSULATION_PROVIDER: Provider = {
  provide: TEMPLATE_ENCAPSULATIONS,
  useValue: { name: 'txt', container: ParagraphComponent },
  multi: true
};
```
```html
<ng-container *encapsulate="'p'; if isParagraph; else 'txt'">Hello World!</ng-container>
<ng-container *encapsulate="'p'; if isParagraph">Hello World!</ng-container>
<ng-container *encapsulate="'p'">Hello World!</ng-container>
```

_Output for `isParagraph = true`_
```html
<paragraph>Hello World!</paragraph>
```

_Output for `isParagraph = false`_
```html
<text>Hello World!</text>
```
