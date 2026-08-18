<script setup>

const hashtags=[

"#التسويق",

"#GoogleAds",

"#DigitalMarketing",

"#Business",

"#Marketing",

"#SEO",

"#MetaAds",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

إدارة الوسوم

</h1>

<div class="flex flex-wrap gap-4">

<div

v-for="tag in hashtags"

:key="tag"

class="rounded-full bg-blue-100 px-5 py-3 text-blue-700">

{{ tag }}

</div>

</div>

</div>

</template>