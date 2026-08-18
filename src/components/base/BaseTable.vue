<script setup>
defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>

<div class="overflow-x-auto">

<table class="w-full">

<thead class="bg-slate-50">

<tr>

<th
v-for="header in headers"
:key="header.key"
class="p-4 text-right font-semibold">

{{ header.label }}

</th>

</tr>

</thead>

<tbody>

<slot/>

</tbody>

</table>

</div>

</template>