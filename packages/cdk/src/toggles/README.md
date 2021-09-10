# Toggle

A `[toggle]` is an extremely generic building block that aims to provide the commonly known toggle behavior, also implemented within check or radio boxes. The only difference is, that we are going to use a directive instead of a component syntax.

```html
<button toggle></button>
<button [toggle]="'foo'"></button>
```

## Styling

Toggle instance will add or remove the `checked` class to their host elements depending on the state of the directive. This allows for style manipulation based on the following selectors.

```css
button.checked {
  background-color: var(--primary);
  color: var(--primary-contrast);
}

button:not(.checked) {
  /* ... */
}
```
