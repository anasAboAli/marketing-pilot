<script setup>
defineProps({
  title: String,

  icon: String,

  to: String,
});
</script>

<template>
  <RouterLink
    :to="to"
    class="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-slate-100"
  >
    <i :class="icon" />

    <span>
      {{ title }}
    </span>
  </RouterLink>
</template>
