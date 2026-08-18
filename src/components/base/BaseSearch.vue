<script setup>
const model = defineModel();
</script>

<template>

<input
v-model="model"
type="text"
placeholder="ابحث..."
class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600">

</template>