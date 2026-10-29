# Sidebar component specification

Status: Accepted

Date: 2026-10-29

## Purpose

Sidebar provides composable application navigation with persistent desktop
placement, an optional icon-collapse mode, and modal off-canvas behaviour on
small screens. It owns navigation-shell behaviour while applications own route
data, product branding, account controls, and persistence.

The component takes structural and behavioural inspiration from the
[shadcn-svelte Sidebar](https://www.shadcn-svelte.com/docs/components/sidebar),
particularly its provider, fixed header and footer, scrollable content, groups,
menus, trigger, and inset composition.

## Scope

The first release supports:

- a labelled complementary navigation landmark
- logical start or end placement
- attached, floating, and inset visual variants
- persistent, off-canvas, and icon-collapse desktop modes
- modal off-canvas presentation below the tablet breakpoint
- controlled and uncontrolled open state
- fixed header and footer regions around independently scrolling content
- labelled navigation groups
- links, action buttons, badges, per-item actions, and nested lists
- a trigger and an inset main-content wrapper
- dark, light, system, forced-colour, reduced-motion, and reflow behaviour

## Non-goals

- Properties panels remain application compositions built from Panel. The
  approved properties-sidebar width tokens remain available for future tool
  layouts.
- Sidebar does not own route matching, breadcrumbs, product switchers, account
  menus, or permission filtering.
- Sidebar does not persist state in cookies or storage. Consumers may persist
  the bindable state.
- Sidebar does not register a global keyboard shortcut. Applications may call
  the public controller from their own shortcut system.
- Flyout submenus, skeleton placeholders, drag resizing, and a polymorphic
  child-prop API are deferred until a consumer requires them.
- Sidebar does not introduce dedicated colour tokens in the first release.
  Existing semantic surface, text, border, and interaction roles apply.

## Anatomy

### SidebarProvider

Owns one sidebar instance and exposes reactive state to descendants.

- `open` is bindable and defaults to `true`
- `mobileOpen` is bindable and defaults to `false`
- `state` resolves to `expanded` or `collapsed`
- `isMobile` reflects the shared tablet breakpoint
- `setOpen`, `setMobileOpen`, and `toggle` support external controls
- uncontrolled state remains internal
- controlled state follows the bound values

One provider controls one Sidebar. Applications with separate navigation areas
use separate providers and explicit layout composition.

### Sidebar

Renders the navigation shell and requires a concise accessible `label`.

- desktop semantics use an `aside` containing a labelled `nav`
- mobile open state behaves as a modal navigation surface
- `side` uses logical values `start` and `end`
- `variant` controls the relationship to surrounding content
- `collapsible` controls desktop collapse behaviour
- the generated shell ID connects SidebarTrigger through `aria-controls`

Defaults are `side="start"`, `variant="attached"`, and
`collapsible="offcanvas"`.

### SidebarHeader

Provides a persistent region at the block start for branding, a workspace
switcher, or a concise navigation title.

### SidebarContent

Provides the only vertically scrollable region. Header and Footer stay visible
while Content scrolls.

### SidebarFooter

Provides a persistent region at the block end for account controls, settings,
or supporting actions.

### SidebarGroup

Groups related navigation content. Its string `label` and `action` snippet are
optional. A visible label names the group through `aria-labelledby`; a supplied
label may be visually hidden when required.

Collapsible groups compose with Disclosure. Sidebar does not duplicate
Disclosure state or keyboard behaviour.

### SidebarMenu

Renders a native `ul`. Nested SidebarMenu instances preserve list hierarchy and
receive indentation in the expanded state.

### SidebarMenuItem

Renders a native `li` and arranges its primary item with optional `badge` and
`action` snippets. Badge content remains concise. Item actions use Button and
require an accessible name when icon-only.

### SidebarMenuLink

Renders a native anchor. It accepts a required `href` and `label`, an optional
decorative `leadingIcon`, and an optional `current` value compatible with
`aria-current`.

The label remains available to assistive technology in icon-collapse mode. A
Tooltip may repeat the visible name for pointer and keyboard users while the
text is visually hidden.

Every primary item supplies a leading icon when its Sidebar uses icon-collapse
mode.

### SidebarMenuButton

Renders a native button for navigation-adjacent commands. It shares the visual
states of SidebarMenuLink and preserves ordinary button activation behaviour.

### SidebarTrigger

Renders a ghost icon Button connected to the controlled Sidebar. It exposes
`aria-expanded`, `aria-controls`, and a state-specific accessible name:

- `Collapse navigation` while expanded
- `Expand navigation` while collapsed or closed

On mobile, closing restores focus to the trigger that opened the Sidebar.

### SidebarInset

Wraps the application main region for the inset variant. It supplies layout
spacing and rounding while preserving the consumer's native `main` landmark.
It does not render a second `main` element.

## Proposed public API

```ts
type SidebarSide = 'start' | 'end';
type SidebarVariant = 'attached' | 'floating' | 'inset';
type SidebarCollapsible = 'icon' | 'offcanvas' | 'none';
type SidebarState = 'collapsed' | 'expanded';

type SidebarProviderProps = {
  children: Snippet;
  open?: boolean;
  mobileOpen?: boolean;
};

type SidebarProps = HTMLAttributes<HTMLElement> & {
  children: Snippet;
  label: string;
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
};

type SidebarGroupProps = HTMLAttributes<HTMLElement> & {
  children: Snippet;
  label?: string;
  action?: Snippet;
};

type SidebarMenuItemProps = HTMLLiAttributes & {
  children: Snippet;
  action?: Snippet;
  badge?: Snippet;
  submenu?: Snippet;
};

type SidebarMenuLinkProps = HTMLAnchorAttributes & {
  href: string;
  label: string;
  leadingIcon?: Snippet;
  current?: 'page' | 'step' | 'location' | 'date' | 'time' | true;
};

type SidebarMenuButtonProps = HTMLButtonAttributes & {
  label: string;
  leadingIcon?: Snippet;
};
```

Region components accept their corresponding native attributes and an optional
`class`. Exact native-attribute omissions follow the established component
patterns when implementation begins.

The package exports a `useSidebar` controller for controls within the provider:

```ts
type SidebarController = {
  readonly state: SidebarState;
  readonly open: boolean;
  readonly mobileOpen: boolean;
  readonly isMobile: boolean;
  setOpen(open: boolean): void;
  setMobileOpen(open: boolean): void;
  toggle(): void;
};
```

The controller remains reactive and should not be destructured.

## Default composition

```svelte
<SidebarProvider>
  <Sidebar label="Primary" variant="inset" collapsible="icon">
    <SidebarHeader>
      <ProductSwitcher />
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup label="Workspace">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuLink href="/" label="Overview" current="page" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <AccountMenu />
    </SidebarFooter>
  </Sidebar>

  <SidebarInset>
    <header><SidebarTrigger /></header>
    <main>{@render children()}</main>
  </SidebarInset>
</SidebarProvider>
```

## Variants and dimensions

### Attached

The default desktop presentation shares an edge with the application viewport.
It uses the semantic surface and border roles without exterior spacing.

### Floating

The Sidebar sits within application spacing and uses the approved surface,
border, radius, and shadow tokens. It does not create new colour roles.

### Inset

The Sidebar remains visually attached while SidebarInset creates a contained
main surface beside it.

### Widths

- expanded desktop width: `size-sidebar-navigation` (240 px)
- icon-collapse width: `size-control-large` (48 px)
- mobile width: the smaller of `size-sidebar-navigation` and the available
  viewport width after `space-5` remains visible
- off-canvas translation uses the resolved logical side

No public arbitrary-width prop is included initially. Consumers with an
approved layout difference may override a documented component custom property
after that need is established.

## Responsive behaviour

The tablet boundary at 768 CSS px separates persistent and modal behaviour.

### Desktop and tablet

- `none` stays expanded
- `icon` switches between 240 px and 48 px
- `offcanvas` switches between its expanded width and fully outside the viewport
- SidebarInset updates with the Sidebar without horizontal page overflow

### Mobile

- every collapse mode presents the Sidebar off-canvas
- opening adds a backdrop, prevents background scrolling, and moves focus into
  the Sidebar
- Tab and Shift+Tab remain within the open Sidebar
- Escape, backdrop activation, SidebarMenuLink activation, or SidebarTrigger
  closes it
- closing restores focus to the opening control when that control still exists
- background content becomes inert while the Sidebar is open

Viewport changes preserve the desktop `open` value and close `mobileOpen` when
leaving mobile presentation. This prevents a mobile close action from silently
changing the saved desktop preference.

## Interaction behaviour

- Links and buttons use native Tab order and activation behaviour
- Arrow-key composite navigation is omitted because a navigation list follows
  ordinary link and button conventions
- active links use `aria-current` with a persistent background and text treatment
- collapsed icon items keep their accessible names
- activating an item with a nested list while icon-collapsed expands the Sidebar
  before revealing the nested content
- route changes may close the mobile Sidebar through an explicit controller call
- state changes do not move focus on desktop
- all motion uses approved direct or large motion tokens
- reduced-motion preference removes translation animation

## Accessibility requirements

- Sidebar requires an accessible navigation label
- multiple Sidebars require distinct labels
- mobile presentation follows the existing Dialog focus, dismissal, and scroll
  locking requirements
- SidebarTrigger exposes state through `aria-expanded`
- current links use `aria-current`
- group labels remain programmatically associated with group content
- icon-only actions meet accessible-name and Tooltip requirements
- boundaries and focus indicators meet 3:1 contrast
- text and interactive states meet WCAG 2.2 Level AA contrast requirements
- the expanded and icon-collapse states remain usable at 400% zoom
- 24 CSS px minimum and 44 CSS px preferred pointer targets apply
- forced-colour mode preserves boundaries, current state, backdrop, and focus

## State model

| Context | State                | Surface           | Content treatment                        |
| ------- | -------------------- | ----------------- | ---------------------------------------- |
| Desktop | Expanded             | Visible at 240 px | Full labels, groups, badges, and actions |
| Desktop | Icon collapsed       | Visible at 48 px  | Icons and accessible names remain        |
| Desktop | Off-canvas collapsed | Outside viewport  | Inert and excluded from Tab order        |
| Mobile  | Closed               | Outside viewport  | Inert and excluded from Tab order        |
| Mobile  | Open                 | Modal off-canvas  | Full content with focus containment      |

## Token mapping

| Purpose                | Token                                                                          |
| ---------------------- | ------------------------------------------------------------------------------ |
| Expanded width         | `size-sidebar-navigation`                                                      |
| Icon width             | `size-control-large`                                                           |
| Surface                | `colour-surface`                                                               |
| Text                   | `colour-text-primary`                                                          |
| Supporting text        | `colour-text-secondary`                                                        |
| Boundary               | `colour-border`                                                                |
| Active and focus state | `colour-interactive`                                                           |
| Group and item spacing | `space-1` through `space-4`                                                    |
| Floating radius        | `radius-2`                                                                     |
| Floating elevation     | `shadow-1`                                                                     |
| Focus width            | `border-width-emphasised`                                                      |
| Motion                 | `motion-duration-direct`, `motion-duration-large`, and `motion-easing-default` |

Component-specific tokens are added only when implementation proves that a
narrower semantic role is required.

## Workbench coverage

The Sidebar workbench page must demonstrate:

- attached, floating, and inset variants
- logical start and end placement
- none, icon, and off-canvas collapse modes
- header, scrolling content, groups, nested lists, footer, badge, and item action
- active link and disabled action states
- controlled open state and trigger behaviour
- narrow mobile presentation with focus restoration
- long labels, long group lists, and content overflow
- dark, light, registered consumer, reduced-motion, and forced-colour treatments

The catalogue preview uses an expanded attached Sidebar with one labelled
group.

## Test requirements

- provider state and two-way bindings
- trigger state, name, and controlled ID
- native aside, nav, list, link, and button semantics
- active-link `aria-current`
- fixed regions and independently scrollable content
- desktop icon and off-canvas transitions
- mobile open, close, Escape, backdrop, scroll lock, inert background, focus
  containment, and focus restoration
- nested-list expansion from icon-collapse mode
- logical start and end positioning
- resize across the tablet breakpoint without state loss
- reduced-motion and forced-colour CSS rules
- axe checks for expanded, collapsed, and mobile-open examples

## Implementation sequence

1. Provider, controller, Sidebar, Trigger, and responsive state model
2. Header, Content, Footer, and Inset layout regions
3. Group, Menu, MenuItem, MenuLink, and MenuButton
4. Badge and action snippets and nested-menu composition
5. Mobile modal behaviour and focus management
6. Workbench scenarios, focused tests, documentation, and exports

This sequence governs the accepted implementation and future maintenance.
