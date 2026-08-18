<script setup>

const segments=[

"عملاء جدد",

"عملاء نشطون",

"عملاء متوقفون",

"عملاء VIP",

"عملاء لم يتم التواصل معهم",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

شرائح العملاء

</h1>

<div class="space-y-4">

<div
v-for="segment in segments"
:key="segment"
class="rounded-xl border bg-white p-5">

{{ segment }}

</div>

</div>

</div>

</template>