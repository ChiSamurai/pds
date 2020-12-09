# PDS CSS

**PDS CSS** aims to provide a _very_ flexible (s)css foundation layer that can be used to extend and integrate on.

### CSS Resets

The default normalization applied to **prebuilt** stlyeguides is [**ress**][ress]. Please keep in mind that
[**ress**][ress] is not included by default when creating your own styleguide! It is listed as peer dependency of
the `@vitagroup/pds-css` package anyway. So feel free to import it inside your application styles.

[ress]: https://github.com/filipelinhares/ress

## Installation

```
> npm i @vitagroup/pds-css --registry "https://artifactory.vitasystems.dev/artifactory/api/npm/npm/"
```

## Integration

There are always prebuilt (s)css files for the built in styleguide definitions "berry", "petrol" and "blue". Compiled
css files for the respective versions are available under the namespace `@vitagroup/pds-css/prebuilt/*`.

### Using prebuilt Styleguides

```sass
@import "~@vitagroup/pds-css/prebuilt/berry"; // or berry.min
@import "~@vitagroup/pds-css/prebuilt/petrol"; // or petrol.min
@import "~@vitagroup/pds-css/prebuilt/blue"; // or blue.min
```

### Creating a Styleguide

```sass
$purplish: #582ab3;

@use "~@vitagroup/pds-css/sass/color";
@use "~@vitagroup/pds-css/sass/colors" with (
  $primary-light: color.tint($purplish, 25%),
  $primary: $purplish,
  $primary-dark: color.shade($purplish, 25%)
);

@use "~@vitagroup/pds-css/sass/styleguide" with (
  // gets or sets the font family used within the `styleguide.core` mixin
  $font-family: "PT Sans",
  // disabled, enable or scale the spacing as desired
  $spacing: 1,
  // disabled, enable or scale the rounding as desired
  $rounding: 1,
  // enables or disables the output of custom color properties with a coresponding "#{$property}-rgb"
  // variable sibling to extend up on like `color: rgba(var(--primary-rgb), 0.42)`
  $custom-color-properties-rgb: true
);

// includes the foundational style as well as respective custom properties
@include styleguide.core;
// includes semantic text level style (eg. blockquote, label, p, etc.)
@include styleguide.semantics;
// includes a variety of utility classes (eg. .text-primary, text-*, body-small, tiny, etc.)
@include styleguide.class-semantics;
// includes form related style (eg. buttons, inputs, etc.)
@include styleguide.forms;
```

## Further Steps

_You can..._

- learn how to use the pds scss modules (styleguide, typography, elevation, etc.)
- learn how to create your own styleguide
- learn how to write your own definitions for any styleguide to import

_or just..._

- start building your application with _"ready to go"_ styleguide definitions
- start _soft_ integrating the pds principles into your component library ecosystem
