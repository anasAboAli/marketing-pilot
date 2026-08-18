<script setup>

const media=[

"banner.jpg",

"summer.png",

"video.mp4",

"logo.svg",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

مكتبة الوسائط

</h1>

<div class="grid grid-cols-4 gap-6">

<div

v-for="file in media"

:key="file"

class="rounded-xl border bg-white p-6">

<div class="text-5xl">

🖼️

</div>

<h2 class="mt-5">

{{ file }}

</h2>

</div>

</div>

</div>

</template>