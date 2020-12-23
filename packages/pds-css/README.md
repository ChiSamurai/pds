# PDS CSS

**PDS CSS** aims to provide a _very_ flexible (s)css foundation that can be used to further extend and integrate on.
While most use cases are satisfied with the _prebuilt_ css files included within any package distribution, you'll
probably find yourself in a situation where you need to customize or extend upon existing (PDS) specifications.

## Installation

```
> npm i @vitagroup/pds-css
```

## Integration

As already teased, there are prebuilt (s)css files for simplified integration of the in-house
_themes_ "berry", "petrol" and "blue". Compiled css files for the respective versions can be found
in `@vitagroup/pds-css/prebuilt/*`.

### Using a prebuilt Styleguide

```scss
@import "~@vitagroup/pds-css/prebuilt/berry.css"; // or "petrol" or "blue"
```

### Creating a Styleguide

```scss
@use "~@vitagroup/pds-css/sass/util";

$purplish: #582ab3;

@use "~@vitagroup/pds-css/sass/styleguide/colors" with (
  $primary-light: util.color-tint($purplish, 25%),
  $primary: $purplish,
  $primary-dark: util.color-shade($purplish, 25%)
);

@use "~@vitagroup/pds-css/sass/styleguide" as pds with (
  // Gets or sets the foreground color property name
  $foreground-color: --gray-darker,
  // Gets or sets the background color property name
  $background-color: --gray-lighter,
  // Gets or sets the custom property name that's used to resolve the body typography
  $body-typography: --body,
  // Gets or sets the font family used within the `styleguide.core` mixin
  $font-family: "PT Sans",
  // Disabled, enable or scale the spacing as desired
  $spacing: 1,
  // Disabled, enable or scale the rounding as desired
  $rounding: 1,
  // Enables or disables the output of custom color properties with a corresponding "#{$property}-rgb"
  // variable sibling to extend up on like `color: rgba(var(--primary-rgb), 0.42)`. Default is `false`
  $color-rgb: true,
  // Customizable color class list (requires corresponding $color definitions), default to:
  $color-classes: ("primary", "primary-dark", "primary-light", "good", "warning", "bad")
  // Customizable typography class list (requires corresponding $typography definitions), default to:
  $typography-classes: ("body-small", "capitalized", "lead", "small", "tiny")
);

// Includes the foundational style as well as respective custom properties
@include pds.core;
// Includes semantic text level style (eg. blockquote, label, p, etc.)
@include pds.semantics;
// Includes a variety of utility classes (eg. .text-primary, text-*, body-small, tiny, etc.)
@include pds.class-semantics;
// Includes form related style (eg. buttons, inputs, etc.)
@include pds.forms;
```

### Creating a Styleguide Theme

```scss
@use "~@vitagroup/pds-css/sass/styleguide" as pds with ( $color-rgb: true );

// Defining an examplary dark theme
$dark-theme: pds.theme-define((
  // Mandatory color overwrites
  "foreground": --light,
  "background": --dark-t1,
  
  "gray-darkest": --light-t1,
  "gray-darker": --light-t2,
  "gray-dark": --dark-t4,
  "gray": --dark-t3,
  "gray-light": --dark-t2,
  "gray-lighter": --dark-t1,
  "gray-lightest": --dark
), (
  // Optional typography overwrites
  "body": pds.typography-define(20px),
  "body-small": pds.typography-define(15px, 500)
), (
  // Optional other custom property overwrites
));

@at-root .dark {
  // Includes custom property overwrites of the $dark-theme
  @include pds.theme($dark-theme);
}
```
