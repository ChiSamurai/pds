# Spacing

The spacing module provides a few utility mixins and a default variable set to work
with `padding` and `margin` declarations.

## Usage

```scss
@use "styleguide" as pds;
```

## Default Spacings

| SCSS Variable    | CSS Variable     |   Value    |
|:-----------------|:---------------- | ----------:|
| `$spacing-xxl`   | `--space-xxl`    |   `48px`   |
| `$spacing-xl`    | `--space-xl`     |   `40px`   |
| `$spacing-lg`    | `--space-lg`     |   `32px`   |
| `$spacing-md`    | `--space-md`     |   `24px`   |
| `$spacing-sm`    | `--space-sm`     |   `16px`   |
| `$spacing-xs`    | `--space-xs`     |    `8px`   |
| `$spacing-xxs`   | `--space-xxs`    |    `4px`   |

## Mixins

### Spacing

```scss
@mixin spacing() { /* [native code] */ }
```

| Parameters                          | Required  | Default   |
|:----------------------------------- |:---------:|:--------- |
| `$space`                            |  **yes**  |           |
| `$type`                             |  **yes**  |           |
| `$anchors`                          |    no     | `all`     |
| `$trim`                             |    no     | `false`   |
| `$justify`                          |    no     | `false`   |
| `$pseudo-mode`                      |    no     | `child`   |

###### Examples

```scss
@use "styleguide" as pds;

.outer-space-xl {
  @include pds.spacing(--space-xl, margin);
}
.inner-space-15 {
  @include pds.spacing(15px, padding);
}

.child-space-md > * {
  @include pds.spacing(--space-md, margin, x, $trim: true, $justify: true);
}
```

### Trim

The `$trim` parameter allows us to control whether the **first** and **last** elements,
matching the given selector, will have leading and trailing space. This behavior can be
adjusted furthermore using the `$pseudo-mode` parameter.

### Justify

The `$justify` parameter allows us to control whether the **inner** elements, matching
the given selector, will have _stacking_ space. When applying outer spacing on an axis
anchor (e.g. `x`) you'll often end up with space in-between elements that kind of stacks
up resulting in the elements being further apart than expected. _Justifying_ will resolve
this undesired behavior. It can also be furthermore adjusted using the `$pseudo-mode`
parameter.

### Pseudo Mode

The `$pseudo-mode` parameter controls what type of pseudo selector will be used when
trimming and/or justifying. There are generally two valid values for the parameter:

| Pseudo Mode  | Pseudo Classes                    |
|:------------ |:--------------------------------- |
| `child`      | `:first-child`, `:last-child`     |
| `of-type`    | `:first-of-type`, `:last-of-type` |

You can read more about pseudo classes at [MDN - Pseudo Classes](https://developer.mozilla.org/de/docs/Web/CSS/Pseudo-classes).

###### Related Links

- [`:first-child`](https://developer.mozilla.org/de/docs/Web/CSS/:first-child)
- [`:last-child`](https://developer.mozilla.org/de/docs/Web/CSS/:last-child)
- [`:first-of-type`](https://developer.mozilla.org/de/docs/Web/CSS/:first-of-type)
- [`:last-of-type`](https://developer.mozilla.org/de/docs/Web/CSS/:last-of-type)

### Inner Spacing

```scss
@mixin inner-spacing() { /* [native code] */ }
```

| Parameters                          | Required  | Default   |
|:----------------------------------- |:---------:|:--------- |
| `$space`                            |  **yes**  |           |
| `$anchors`                          |    no     | `all`     |
| `$trim`                             |    no     | `false`   |
| `$justify`                          |    no     | `false`   |
| `$pseudo-mode`                      |    no     | `child`   |

###### Examples

```scss
@use "styleguide" as pds;

.inner-space-42 {
  @include pds.inner-spacing(42px, y, $pseudo-mode: of-type);
}
```

### Outer Spacing

```scss
@mixin outer-spacing() { /* [native code] */ }
```

| Parameters                          | Required  | Default   |
|:----------------------------------- |:---------:|:--------- |
| `$space`                            |  **yes**  |           |
| `$anchors`                          |    no     | `all`     |
| `$trim`                             |    no     | `false`   |
| `$justify`                          |    no     | `false`   |
| `$pseudo-mode`                      |    no     | `child`   |

###### Examples

```scss
@use "styleguide" as pds;

$space: var(--space-xxl) !default;

.outer-space {
  @include pds.outer-spacing($space, y, $trim: true, $justify: true);
}
```

#### Outer Child Spacing

```scss
@mixin outer-child-spacing() { /* [native code] */ }
```

| Parameters                          | Required  | Default   |
|:----------------------------------- |:---------:|:--------- |
| `$space`                            |  **yes**  |           |
| `$anchors`                          |    no     | `all`     |
| `$trim`                             |    no     | `false`   |
| `$justify`                          |    no     | `false`   |
| `$pseudo-mode`                      |    no     | `child`   |

###### Examples

```scss
@use "styleguide" as pds;

.list-xl {
  @include pds.outer-child-spacing(--space-xl, y, $trim: true, $justify: true);
}
```

#### Outer Sibling Spacing

```scss
@mixin outer-sibling-spacing() { /* [native code] */ }
```

| Parameters                          | Required  | Default   |
|:----------------------------------- |:---------:|:--------- |
| `$space`                            |  **yes**  |           |
| `$anchors`                          |    no     | `left`    |
| `$trim`                             |    no     | `false`   |
| `$justify`                          |    no     | `false`   |
| `$pseudo-mode`                      |    no     | `child`   |

###### Examples

```scss
@use "styleguide" as pds;

button {
  @include pds.outer-sibling-spacing(--space-md);
}
```
