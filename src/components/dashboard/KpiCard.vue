<script setup>
defineProps({
  title: String,
  value: [String, Number],
  change: String,
  changeType: {
    type: String,
    default: "success",
  },
});
</script>

<template>
  <div
    class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <p class="text-sm text-slate-500">
      {{ title }}
    </p>

    <h3 class="mt-3 text-3xl font-bold text-slate-900">
      {{ value }}
    </h3>

    <span
      class="mt-4 inline-flex rounded-full px-3 py-1 text-sm font-semibold"
      :class="{
        'bg-green-100 text-green-600': changeType === 'success',
        'bg-red-100 text-red-600': changeType === 'danger',
        'bg-blue-100 text-blue-600': changeType === 'info',
      }"
    >
      {{ change }}
    </span>
  </div>
</template>