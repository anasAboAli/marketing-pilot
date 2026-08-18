<script setup>

defineProps({

loading:Boolean,

type:{
type:String,
default:"button"
}

});

</script>

<template>

<button
:type="type"
:disabled="loading"
class="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50">

<span v-if="loading">

جارٍ الحفظ...

</span>

<span v-else>

<slot/>

</span>

</button>

</template>