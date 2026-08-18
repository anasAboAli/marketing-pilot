<script setup>
defineProps({
  title: String,
  description: String,
});
</script>

<template>

<div class="mb-8 flex items-center justify-between">

<div>

<h1 class="text-3xl font-bold">

{{ title }}

</h1>

<p class="mt-2 text-slate-500">

{{ description }}

</p>

</div>

<div>

<slot/>

</div>

</div>

</template>