<script setup>

import { ref } from "vue";

const topic=ref("");

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

مولد المحتوى

</h1>

<BaseInput

v-model="topic"

label="موضوع المحتوى"/>

<textarea

rows="10"

class="mt-6 w-full rounded-xl border px-4 py-3"

placeholder="سيظهر المحتوى هنا...">

</textarea>

<div class="mt-6">

<BaseButton>

توليد المحتوى

</BaseButton>

</div>

</div>

</template>