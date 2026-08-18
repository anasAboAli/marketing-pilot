<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number,
});
</script>

<template>

<div class="mt-6 flex items-center justify-between">

<p class="text-sm text-slate-500">

الصفحة {{ currentPage }} من {{ totalPages }}

</p>

<div class="flex gap-2">

<button
class="rounded-lg border px-4 py-2">

السابق

</button>

<button
class="rounded-lg bg-blue-600 px-4 py-2 text-white">

التالي

</button>

</div>

</div>

</template>