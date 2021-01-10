# Getting Started

The **PDS** ecosystem provides a variety of _atomic_ [Angular][aio] components as well extensive
[Sass][sass] styling capabilities. While the components completely depend on the `scss` codebase,
the **Sass** capabilities itself can actually be used standalone, as they are part of an
independent package, **PDS CSS**. There's also a CDK (Component Development Kit) powering the 
**Angular** components part, which doesn't depend on any of the **Sass** features, but is in turn
pretty abstract in its nature. Anyway, most of this stuff is behind the scenes, as we also _plan_
to provide a set of schematics to simplify integration effort. 

**As of now, there are unfortunately no such schematics in place.** Therefore each desired **PDS**
package has to be installed manually.

## Components

```
npm i @vitagroup/pds-components
```

Built-in components and related declarations can be quickly accessed using a `pds` prefix when
typing inside a template or searching for potential integrations somewhere else. An overview
however can be found in the [components](/components) section. Most of the components also
feature a highly customizable dependency injection structure. Make sure to check out the
independent guides about the different key concepts and configurable interfaces.

## CSS

```
npm i @vitagroup/pds-css
```

There are multiple ways to build up on the styling definitions and utilities provided within
**PDS CSS**. The simplest way is to import a prebuilt `css` file from the `prebuilt` folder.
If the integration approach targets for a more complex use case than just resetting styles 
(e.g. building custom web components) then the rich `scss` codebase should be your "go to".

###### Prebuilt CSS

```css
@import "~@vitagroup/pds-css/prebuilt/berry.css";
```

Fore further information about integrating [Sass][sass] based APIs take a look at the [Styling Guide](/guides/styling).


  [aio]: https://angular.io
  [sass]: https://sass-lang.com
