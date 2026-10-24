<script lang="ts">
  interface Props {
    category: string;
    description: string;
    status?: 'Draft' | 'Ready';
    title: string;
  }

  let { category, description, status = 'Ready', title }: Props = $props();
</script>

<header class="component-heading">
  <p class="eyebrow">{category}</p>
  <div class="component-heading__title">
    <h1>{title}</h1>
    <span class="status">{status}</span>
  </div>
  <p>{description}</p>
</header>

<nav class="section-navigation" aria-label="On this page">
  <a href="#playground">Playground</a>
  <a href="#variants">Variants</a>
  <a href="#states">States</a>
  <a href="#guidance">Guidance</a>
  <a href="#reference">Reference</a>
</nav>
