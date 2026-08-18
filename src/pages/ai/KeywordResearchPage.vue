<script setup>

const keywords=[

"google ads",

"digital marketing",

"seo",

"facebook ads",

"landing page",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

البحث عن الكلمات المفتاحية

</h1>

<div class="space-y-4">

<div

v-for="keyword in keywords"

:key="keyword"

class="rounded-xl border bg-white p-5">

{{ keyword }}

</div>

</div>

</div>

</template>