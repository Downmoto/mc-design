<script lang="ts">
  import { Table } from '#lib/index.js';
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex (Scrollable table needs keyboard focus) -->
<div
  class="table-scroll"
  role="region"
  aria-label="Table component preview"
  tabindex="0"
>
  <Table size="compact" variant="divided">
    <thead>
      <tr>
        <th scope="col">Component</th>
        <th scope="col">Category</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">List</th>
        <td>Structure</td>
      </tr>
      <tr>
        <th scope="row">Table</th>
        <td>Structure</td>
      </tr>
    </tbody>
  </Table>
</div>
