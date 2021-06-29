# Template Outlet

```html
<ng-template #foo>
  <div>bar</div>
  <div>bar2</div>
</ng-template>
<ng-container *templateOutlet="foo; context: { ... }; ngClass: 'foo'; ngStyle: ..."></ng-container>
```

```html
<div class="foo">bar</div>
<div class="foo">bar2</div>
```
