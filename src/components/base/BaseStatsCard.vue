<script setup>
defineProps({
  title: String,
  value: String,
  change: String,
  color: {
    type: String,
    default: "green",
  },
});
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

    <p class="text-slate-500">
      {{ title }}
    </p>

    <h2 class="mt-4 text-3xl font-bold">
      {{ value }}
    </h2>

    <span
      class="mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold"
      :class="{
        'bg-green-100 text-green-700': color === 'green',
        'bg-red-100 text-red-700': color === 'red',
        'bg-blue-100 text-blue-700': color === 'blue',
      }"
    >
      {{ change }}
    </span>

  </div>
</template>