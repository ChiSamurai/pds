# Component Development Kit

This package provides common Angular related providers and injection tokens as well as abstract directive
implementations to fast-forward the development of component libraries.

## Installation

```
npm i @vitagroup/cdk
```

## Sass

### Angular CDK Overlay

As of now, it's only necessary to include the `overlay` mixin included in the `@angular/cdk` dependency.

```scss
@use "~@angular/cdk/overlay" as ng;

@include ng.overlay;
```
