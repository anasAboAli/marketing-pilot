<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: { type: String, default: "primary" },
  size: { type: String, default: "md" },
  loading: Boolean,
  disabled: Boolean,
  type: { type: String, default: "button" },
  fullWidth: Boolean,
});

const emit = defineEmits(["click"]);

const classes = computed(() => {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500",
    warning: "bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-400",
    ghost: "text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-400",
    outline: "border border-blue-600 text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-500",
    link: "px-0 text-blue-600 hover:text-blue-700 focus-visible:ring-blue-500",
  };
  const sizes = { sm: "min-h-9 px-3 text-sm", md: "min-h-11 px-4 text-sm", lg: "min-h-[52px] px-6", xl: "min-h-[52px] px-8 text-lg" };
  return ["inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", variants[props.variant] || variants.primary, sizes[props.size] || sizes.md, props.fullWidth ? "w-full" : ""];
});

function handleClick(event) {
  if (!props.loading && !props.disabled) emit("click", event);
}
</script>

<template>
  <button :type="type" :class="classes" :disabled="disabled || loading" :aria-busy="loading || undefined" @click="handleClick">
    <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
    <slot />
  </button>
</template>
