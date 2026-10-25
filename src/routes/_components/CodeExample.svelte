<script lang="ts">
  import { Typography } from '#lib/index.js';

  interface Props {
    code: string;
  }

  let { code }: Props = $props();
  let copyStatus = $state('');

  async function copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(code);
      copyStatus = 'Copied';
    } catch {
      copyStatus = 'Copy failed';
    }
  }
</script>

<div class="code-example">
  <div class="code-example__header">
    <Typography variant="small">Svelte</Typography>
    <button type="button" class="text-action" onclick={copyCode}
      >Copy code</button
    >
  </div>
  <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable code needs keyboard focus) -->
  <pre role="region" aria-label="Code example" tabindex="0"><code>{code}</code
    ></pre>
  <span class="visually-hidden" aria-live="polite">{copyStatus}</span>
</div>
