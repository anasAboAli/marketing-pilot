<script setup>
defineOptions({ inheritAttrs: false });
const model = defineModel();

defineProps({
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: "text",
  },
  error: String,
  id: String,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
});
</script>

<template>
  <div>

    <label
      v-if="label"
      :for="id"
      class="mb-2 block font-medium"
    >
      {{ label }}
    </label>

    <input
      v-model="model"
      v-bind="$attrs"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :aria-invalid="Boolean(error)"
      :aria-describedby="error ? `${id}-error` : undefined"
      :class="['w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500', error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-slate-300']"
    >

    <p
      v-if="error"
      :id="`${id}-error`"
      class="mt-2 text-sm text-red-600"
    >
      {{ error }}
    </p>

  </div>
</template>
