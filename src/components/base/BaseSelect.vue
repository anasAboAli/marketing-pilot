<script setup>
const model = defineModel();

defineProps({
  label: String,
  options: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>

<div>

<label
v-if="label"
class="mb-2 block font-medium">

{{ label }}

</label>

<select
v-model="model"
class="w-full rounded-xl border border-slate-300 px-4 py-3">

<option
v-for="option in options"
:key="option.value ?? option"
:value="option.value ?? option">

{{ option.label ?? option }}

</option>

</select>

</div>

</template>