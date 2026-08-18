<script setup>

defineProps({

items:Array,

});

</script>

<template>

<div class="mb-6 flex items-center gap-2 text-sm text-slate-500">

<span

v-for="item in items"

:key="item">

{{ item }}

</span>

</div>

</template>