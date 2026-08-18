<script setup>

const model=defineModel();

defineProps({

label:String,

options:Array

});

</script>

<template>

<div>

<label class="mb-2 block font-medium">

{{ label }}

</label>

<select

v-model="model"

class="w-full rounded-xl border border-slate-300 px-4 py-3">

<option
v-for="option in options"
:key="option">

{{ option }}

</option>

</select>

</div>

</template>