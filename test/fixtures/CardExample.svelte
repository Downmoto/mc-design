<script lang="ts">
  import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardHero,
    type CardOrientation,
  } from '#lib/index.js';

  let {
    content = true,
    footer = true,
    header = true,
    hero = true,
    orientation = 'vertical',
  }: {
    content?: boolean;
    footer?: boolean;
    header?: boolean;
    hero?: boolean;
    orientation?: CardOrientation;
  } = $props();
</script>

<Card
  class="custom-card"
  consumer="website"
  data-example="project"
  {orientation}
>
  {#if hero}
    <CardHero data-part="hero"><div aria-hidden="true">Effect</div></CardHero>
  {/if}
  {#if header}
    <CardHeader data-part="header"><h2>Project atlas</h2></CardHeader>
  {/if}
  {#if content}
    <CardContent data-part="content">Project description</CardContent>
  {/if}
  {#if footer}
    <CardFooter data-part="footer"
      ><a href="/project">View project</a></CardFooter
    >
  {/if}
</Card>
