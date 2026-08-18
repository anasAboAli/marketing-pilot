<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>

<nav class="mb-6 flex items-center gap-2 text-sm text-slate-500">

<template
v-for="(item,index) in items"
:key="index">

<span>

{{ item }}

</span>

<span
v-if="index<items.length-1">

/

</span>

</template>

</nav>

</template>