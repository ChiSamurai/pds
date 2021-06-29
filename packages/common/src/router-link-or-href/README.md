# RouterLink or Href

The `[routerLinkOrHref]` directive aims to combine the `[routerLink]` and `[href]` behaviors.

## Usage as Href

```html
<a routerLinkOrHref="https://lorem.ipsum">Lorem ipsum</a>
<!-- or -->
<div [routerLinkOrHref]="'https://lorem.ipsum'">Lorem ipsum</div>
```

The usage as href additionally allows passing an optional `[target]` value. The value will default to `_blank`.

## Usage as RouterLink

```html
<a routerLinkOrHref="/lorem/ipsum">Lorem ipsum</a>
<!-- or -->
<div [routerLinkOrHref]="[ '/lorem', 'ipsum' ]">Lorem ipsum</div>
```

The usage as router link allows all known `[routerLink]` inputs, such as `[queryParams]` or `[queryParamsHandling]`. Support
for desired `[routerLinkActive]` applications is also provided out of the box.

```html
<!-- This will work as expected! -->
<div routerLinkOrHref="/lorem/ipsum" routerLinkActive="active"></div>
```
