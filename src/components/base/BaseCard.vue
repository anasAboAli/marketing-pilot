<template>
  <div
    class="rounded-2xl border border-slate-200 bg-white shadow-sm"
  >
    <div
      v-if="$slots.header"
      class="border-b border-slate-200 p-6"
    >
      <slot name="header" />
    </div>

    <div class="p-6">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="border-t border-slate-200 p-6"
    >
      <slot name="footer" />
    </div>
  </div>
</template>