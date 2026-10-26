<script lang="ts">
  import { RadioGroup } from '#lib/index.js';

  const options = [
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' },
  ];
</script>

<RadioGroup label="Theme" {options} value="dark" />
