<script setup>

const ideas=[

"صورة منتج بخلفية بيضاء",

"إعلان بأسلوب ثلاثي الأبعاد",

"صورة لابتوب مع مخطط نمو",

"منشور إنستغرام حديث",

"إعلان احترافي لمنتج",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

أفكار الصور

</h1>

<div class="grid grid-cols-2 gap-6">

<div

v-for="idea in ideas"

:key="idea"

class="rounded-xl border bg-white p-6">

{{ idea }}

</div>

</div>

</div>

</template>