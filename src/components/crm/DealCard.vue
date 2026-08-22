<script setup>

defineProps({

deal:Object,

});

</script>

<template>

<div style="text-align: center; width: 100%;"
class="mb-4 rounded-xl border bg-white p-4 shadow-sm">

<h3 class="font-semibold">

{{ deal.client }}

</h3>

<p class="mt-2 text-slate-500">

{{ deal.value }} ر.س

</p>

</div>

</template>