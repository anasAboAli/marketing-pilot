<script setup>

import { useFilesStore } from "@/stores/files";

const files=useFilesStore();

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

مدير الملفات

</h1>

<div class="grid grid-cols-4 gap-6">

<div

v-for="file in files.files"

:key="file.id"

class="rounded-2xl border bg-white p-6">

<div class="text-5xl">

📄

</div>

<h2 class="mt-5 font-semibold">

{{ file.name }}

</h2>

<p class="mt-2 text-slate-500">

{{ file.size }}

</p>

</div>

</div>

</div>

</template>