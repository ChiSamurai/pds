# Typography

The typography module provides a few utility functions and mixins to work with `font-family`,
`font-size`, `font-weight`, `line-height`, `letter-spacing` and `text-transform` properties
using one variable.

## Usage

```scss
@use "styleguide" as pds;
```

## Defining Typography

```scss
@function typography-define() { /* [native code] */ }
```

| Parameters                          | Required  |
|:----------------------------------- |:---------:|
| `$font-size`                        |  **yes**  |
| `$line-height`                      |    no     |
| `$font-weight`                      |    no     |
| `$letter-spacing`                   |    no     |
| `$text-transform`                   |    no     |
| `$font-family`                      |    no     |

```scss
@use "styleguide" as pds;

$my-typography: pds.typography-define(18px);
// note that you can also prepend function parameters before their actual order in sass:
$my-mono-typography: pds.typography-define(16px, $font-family: monospace);
```

## Including Typography

You can either include a whole typography definition or you can only include the styling
related subset of the definition, which will opt out of any `font-family` overwrites!

```scss
@use "styleguide" as pds;

.my-typography {
  @include pds.typography($my-typography);
}
.my-typography-style {
  @include pds.typography-style($my-typography);
}
```

## Typography Getters

Each "property" of a typography variable has its own getter function within the module.

```scss
@use "styleguide" as pds;

$font-size: pds.typography-get-font-size($my-typography);
$font-weight: pds.typography-get-font-weight($my-typography);
```
