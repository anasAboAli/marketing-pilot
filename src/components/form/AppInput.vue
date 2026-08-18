<script setup>

const model=defineModel();

defineProps({

label:String,

placeholder:String,

type:{
type:String,
default:"text"
}

});

</script>

<template>

<div>

<label class="mb-2 block font-medium">

{{ label }}

</label>

<input

v-model="model"

:type="type"

:placeholder="placeholder"

class="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-600 outline-none">

</div>

</template>