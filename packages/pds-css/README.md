# PDS CSS

**PDS CSS** aims to provide a _very_ flexible (s)css foundation that can be used to further extend and integrate on.
While most use cases are satisfied with the _prebuilt_ css files included within any package distribution, you'll
probably find yourself in a situation where you need to customize or extend upon existing (PDS) specifications.

## Installation

```
npm i @vitagroup/pds-css
```

## CSS

There is a naively prebuilt css file for the signature color **berry**, that can be imported as easy as...

```css
@import "~@vitagroup/pds-css/prebuilt/berry.css";
```

## Sass

Before we can start using the Sass API it's recommended to include the base path
to the root of the installed `@vitagroup/pds-css/sass` lib. This is usually done using
the `includePaths` option of your Sass build configuration.

```json
{
  "includePaths": [
    "node_modules/@vitagroup/pds-css/sass"
  ]
}
```

The core `scss` styling functionality can be found in the `styleguide` module. Additional
utility features are also available inside the `util` module. Both aim to group, forward
and simplify the usage of the extensive underlying module foundation consisting of various
mixin, function and variable definitions.

```scss
@use "styleguide";
@use "util";
```

### Building a Styleguide

The core styleguide API basically consists of two mixins, `core` and `html5`. Additionally
`color-classes` and `typography-classes` can be included for the output generation of a set
of CSS utility classes.

```scss
@use "styleguide" as pds;

@include pds.core;
@include pds.html5;
@include pds.sheet;

@include pds.color-classes;
@include pds.typography-classes;
```

### Customizing a Styleguide

Let's assume we want to change the primary color palette to some purple-ish colors. And we
are also including only a subset of the available styleguide mixins.

```scss
@use "styleguide" as pds with (
  $color-primary-dark: #5c5c80,
  $color-primary: #9393cc,
  $color-primary-light: #b8b8ff
);

@include pds.core;
@include pds.html5;
```

### Building a Theme

A common desire, especially by developers, is a dark theme. Luckily the **PDS**
comes with its own _pre-defined_ dark theme, `pds.$dark-theme`. The theme should
basically take effect as soon as we apply the `dark` class somewhere.

```scss
@use "styleguide" as pds;

@at-root .dark {
  @include pds.theme(pds.$dark-theme);
}
```

We can also create a custom dark theme with just some gray overwrites.

```scss
@use "styleguide" as pds;

$dark-theme: pds.theme-define(
  (
    "foreground": #f2f2f2,
    "background": --gray-lightest,

    "gray-darkest": #d9d9d9,
    "gray-darker": #bfbfbf,
    "gray-dark": #6b6b6b,
    "gray": #383838,
    "gray-light": #212121,
    "gray-lighter": #1a1a1a,
    "gray-lightest": #141414
  )
);

@at-root .dark {
  @include pds.theme($dark-theme);
}
```
