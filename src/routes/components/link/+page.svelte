<script lang="ts">
  import { Link } from '#lib/index.js';
  import CodeExample from '../../_components/CodeExample.svelte';
  import ComponentHeader from '../../_components/ComponentHeader.svelte';

  let label = $state('About MemoryCore');
  let href = $state('https://memorycore.dev/about');
  let activationCount = $state(0);
  let exampleCode = $derived(
    `<Link href="${href || '#'}">${label || 'Link'}</Link>`,
  );

  function handlePreviewClick(event: MouseEvent): void {
    event.preventDefault();
    activationCount += 1;
  }
</script>

<svelte:head>
  <title>Link · MemoryCore component library</title>
</svelte:head>

<ComponentHeader
  category="Actions"
  title="Link"
  description="Navigates to another location with descriptive, visibly underlined text"
  sections={['playground', 'guidance', 'reference']}
/>

<section
  class="workbench-section"
  id="playground"
  aria-labelledby="playground-title"
>
  <div class="section-heading">
    <h2 id="playground-title">Playground</h2>
  </div>

  <div class="playground">
    <div class="playground__preview">
      <Link href={href || '#'} onclick={handlePreviewClick}>
        {label || 'Link'}
      </Link>
      <p class="interaction-result" aria-live="polite">
        Activations: {activationCount}
      </p>
    </div>

    <form class="control-panel" onsubmit={(event) => event.preventDefault()}>
      <label>
        <span>Label</span>
        <input bind:value={label} maxlength="80" />
      </label>
      <label>
        <span>Destination</span>
        <input bind:value={href} maxlength="200" />
      </label>
    </form>
  </div>

  <CodeExample code={exampleCode} />
</section>

<section
  class="workbench-section"
  id="guidance"
  aria-labelledby="guidance-title"
>
  <div class="section-heading">
    <h2 id="guidance-title">Guidance</h2>
  </div>

  <div class="prose-grid">
    <div>
      <h3>Usage</h3>
      <ul>
        <li>Use Link for navigation and Button for in-place actions</li>
        <li>Describe the destination in the visible link text</li>
        <li>Avoid vague labels such as “click here” or “read more”</li>
        <li>Use native anchor attributes for downloads and new contexts</li>
        <li>Warn people in visible text before opening a new context</li>
      </ul>
    </div>
    <div>
      <h3>Accessibility</h3>
      <ul>
        <li>Uses a native anchor with a required destination</li>
        <li>Keeps an underline visible without relying on colour alone</li>
        <li>Uses a flush 2 px theme-contrasting focus-visible outline</li>
        <li>Preserves native keyboard and assistive-technology behaviour</li>
        <li>Respects forced-colour preferences</li>
      </ul>
    </div>
  </div>
</section>

<section
  class="workbench-section"
  id="reference"
  aria-labelledby="reference-title"
>
  <div class="section-heading">
    <h2 id="reference-title">Reference</h2>
  </div>

  <details class="reference-details">
    <summary>API and token reference</summary>
    <div class="reference-details__content">
      <h3>API</h3>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Link API table"
        tabindex="0"
      >
        <table>
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"><code>href</code></th>
              <td><code>string</code></td>
              <td>Required</td>
              <td>Sets the navigation destination</td>
            </tr>
            <tr>
              <th scope="row"><code>consumer</code></th>
              <td><code>ConsumerId</code></td>
              <td>Inherited or neutral</td>
              <td>Sets the consumer colour mapping</td>
            </tr>
            <tr>
              <th scope="row"><code>children</code></th>
              <td><code>Snippet</code></td>
              <td>Required</td>
              <td>Provides the visible link text</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="table-note">
        Native anchor attributes and event handlers pass through
      </p>

      <h3>Token mapping</h3>
      <!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
      <div
        class="table-scroll"
        role="region"
        aria-label="Link token mapping table"
        tabindex="0"
      >
        <table>
          <thead>
            <tr><th scope="col">Role</th><th scope="col">Token</th></tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Text and focus</th>
              <td>
                <code>colour-interactive</code>,
                <code>colour-text-primary</code>
              </td>
            </tr>
            <tr>
              <th scope="row">Underline and outline</th>
              <td>
                <code>border-width-default</code>,
                <code>border-width-emphasised</code>
              </td>
            </tr>
            <tr>
              <th scope="row">Underline offset</th>
              <td><code>space-1</code></td>
            </tr>
            <tr>
              <th scope="row">Response</th>
              <td>
                <code>motion-duration-direct</code>,
                <code>motion-easing-default</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </details>
</section>
