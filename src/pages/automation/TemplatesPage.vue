<script setup>

const templates=[

"رسالة ترحيب",

"عرض سعر",

"فاتورة",

"تذكير",

"شكر للعميل",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

قوالب الرسائل

</h1>

<div class="grid grid-cols-4 gap-6">

<div
v-for="template in templates"
:key="template"
class="rounded-xl border bg-white p-6">

{{ template }}

</div>

</div>

</div>

</template>