# Nav

The PDS navigation component `pds-nav` aims to provide various interfaces to customize and adept
the appearance and behavior of the final result, while also making sure to use a straight forward
entry model.

## Entries

```typescript
const MY_NAV_ENTRIES: NavEntry[] = [
  { 
    name: $localize`Home`,
    linkUrl: '/'
  },
  { 
    name: $localize`Profile`,
    linkUrl: '/profile'
  }
];
```

#### Secondary Entries

Those will appear in the bottom region of a `pds-nav` element.

```typescript
const MY_SECONDARY_NAV_ENTRIES: NavEntry[] = [
  { 
    name: $localize`Logout`,
    action: (auth: AuthService) => auth.logout(),
    deps: [AuthService]
  }
];
```

### Providing Entries

```typescript
const MY_NAV_ENTRY_PROVIDER: Provider = {
  provide: NAV_ENTRIES,
  useValue: MY_NAV_ENTRIES
};

const MY_SECONDARY_NAV_ENTRY_PROVIDER: Provider = {
  provide: PDS_SECONDARY_NAV_ENTRIES,
  useValue: MY_SECONDARY_NAV_ENTRIES
};
```

### Binding Entries

```html
<pds-nav [entries]="MY_NAV_ENTRIES" [secondaryEntries]="MY_SECONDARY_NAV_ENTRIES"></pds-nav>
```

## Entry Templates

Templates will be applied to all entries contained in either `NAV_ENTRIES` or `PDS_SECONDARY_NAV_ENTRIES`.

```html
<pds-nav>
  <pds-nav-entry *navEntryDef="let entry" [entry]="entry">
    {{ entry.name }}
  </pds-nav-entry>
</pds-nav>
```

```html
<pds-nav>
  <a *navEntryDef="let entry" [navEntryLink]="entry">
    {{ entry.name }}
  </a>
</pds-nav>
```

#### Conditional Entry Templates

```typescript
const hasChildren: Predicate<NavEntry> = (entry) => 'children' in entry;
```

```html
<pds-nav>
  <div *navEntryDef="let entry; when: hasChildren">
    <pds-nav-entry [entry]="entry">{{ entry.name }}</pds-nav-entry>

    <div class="nav-entry-children">
      <pds-nav-entry *ngFor="let childEntry of entry.children" [entry]="childEntry">
        {{ childEntry.name }}
      </pds-nav-entry>
    </div>
  </div>
</pds-nav>
```

## Entry Outlets

Caution, when using raw `nav-entry-outlet`s, there's no PDS related styling applied with them. You can use a `pds-nav-entry` element
as template instead of the `a` + `[navEntryLink]` combination (see second example below) to continue using the PDS styles. Other
than that the outlets are pretty dynamic building blocks that interact as "outlet" view container for any kind of entry data.

```html
<nav-entry-outlet [entries]="MY_NAV_ENTRIES"></nav-entry-outlet>
```

```html
<nav-entry-outlet [entries]="MY_NAV_ENTRIES">
  <a *navEntryDef="let entry" [navEntryLink]="entry">
    {{ entry.name }}
  </a>
</nav-entry-outlet>
```
