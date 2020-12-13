# CDK Sass

This section provides some reset mixins that come along some features inside the CDK. Currently, there's
no proper asset handling in place for the ng-packgr builder. That's why all related Sass utility mixins
are grouped into one directory. As soon as https://github.com/ng-packagr/ng-packagr/issues/1497 closes,
this behavior can be changed and all included scss files can be moved into their respective module folders.

### Dialog Overlay

Includes the `@angular/cdk/overlay` mixin and provides some additional styling resets on top.

```sass
@import "~@vitagroup/cdk/sass/mixins";
// or
@import "~@vitagroup/cdk/sass/dialog-overlay";

@include dialog-overlay;
``` 

### Flex Container

```sass
@import "~@vitagroup/cdk/sass/mixins";
// or
@import "~@vitagroup/cdk/sass/flex-container";

@include flex-container;
``` 
