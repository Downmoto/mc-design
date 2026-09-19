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

See [ROADMAP.md](./ROADMAP.md) for the project checklist.
