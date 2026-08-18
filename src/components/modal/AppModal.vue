<script setup>

defineProps({

show:Boolean,

title:String,

});

const emit=defineEmits(["close"]);

</script>

<template>

<div
v-if="show"
class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

<div class="w-full max-w-lg rounded-2xl bg-white p-6">

<div class="mb-6 flex items-center justify-between">

<h2 class="text-xl font-bold">

{{ title }}

</h2>

<button
@click="emit('close')">

✕

</button>

</div>

<slot/>

</div>

</div>

</template>