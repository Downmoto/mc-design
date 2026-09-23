# MC Design

Shared React design system for Memory Core applications.

## Development

```sh
npm install
npm run dev
```

Run every automated check with `npm run check`.

Applications load the shared theme with:

```ts
import "@mc-design/react/styles.css";
```

Dark mode is the default. Set `data-mc-theme="light"` or
`data-mc-theme="dark"` on an application root to select a theme explicitly.

## Toggle buttons

Add `ToggleButton.Icon` to render the toggle as an icon control instead of a
labelled switch. Give icon toggles an accessible name.

```tsx
<ToggleButton aria-label="Pin effect">
  <ToggleButton.Icon>
    <PinIcon />
  </ToggleButton.Icon>
</ToggleButton>
```

Use `variant="ghost"` for a transparent icon toggle. Its icon changes to the
accent colour when selected.

## Modal

`Modal.Root` supports `variant="centered"` (default) and `variant="movable"`.
The movable variant opens at the `Modal.Target` click and can be dragged within
the viewport. Set `initialPosition="center"` to start a movable modal in the
centre instead. Both variants close when clicked outside and block background
interaction and scrolling while open. Set `dimBg={false}` to keep the blocked
background visible without dimming.

```tsx
<Modal.Root variant="movable" initialPosition="center" dimBg={false}>
  <Modal.Target>Open settings</Modal.Target>
  <Modal.Content aria-label="Settings">
    <p>Settings go here.</p>
    <Modal.Close>Close</Modal.Close>
  </Modal.Content>
</Modal.Root>
```

Use `open` and `onOpenChange` to control visibility externally, or `defaultOpen`
for an initially open modal. Give each `Modal.Content` an accessible name with
`aria-label` or `aria-labelledby`.

See [ROADMAP.md](./ROADMAP.md) for the project checklist.
