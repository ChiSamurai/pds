# Tooltip

Tooltips are very small pieces of information that aim to be short and concise, but are still able to hold any kind of "child" element to ensure a templating functionality.

## Usage

A `pds-toolip` offers no substantial styling other than **spacing** and **max-width**. This means, when using the element, you are basically required to nest another component inside to provide a visual appearance to the tooltip.

```html
<a [pdsTooltip]="magicTooltip">Hover me</a>

<pds-tooltip #magicTooltip>
  <pds-banner class="info xs">To see magic</pds-banner>
</pds-tooltip>
```

### Preferred Position

You can set up a preferred position in two different ways. Either by providing a value to the `preferredPosition` input of the `pds-tooltip` that will be used where ever the tooltip will be references with `[pdsTooltip]` or you can overwrite such a general definition on the `[pdsTooltip]` _outlet_ usage itself.

```html
<a [pdsTooltip]="magicTooltip" pdsTooltipPreferredPosition="top">Hover me</a>

<pds-tooltip preferredPosition="bottom" #magicTooltip>
  <pds-banner class="info xs">To see magic</pds-banner>
</pds-tooltip>
```
