<script lang="ts">
  import {
    Table,
    type TableSize,
    type TableVariant,
  } from '../../src/lib/index.js';

  let {
    size = 'standard',
    variant = 'plain',
    withFooter = false,
  }: {
    size?: TableSize;
    variant?: TableVariant;
    withFooter?: boolean;
  } = $props();
</script>

<Table class="custom-table" data-example="releases" {size} {variant}>
  <caption>Component releases</caption>
  <thead>
    <tr>
      <th scope="col">Component</th>
      <th scope="col">Version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">List</th>
      <td>1.0</td>
    </tr>
    <tr>
      <th scope="row">Table</th>
      <td>1.0</td>
    </tr>
  </tbody>
  {#if withFooter}
    <tfoot>
      <tr>
        <th scope="row">Components</th>
        <td>2</td>
      </tr>
    </tfoot>
  {/if}
</Table>
