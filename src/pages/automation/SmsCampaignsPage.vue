<script setup>

const sms=[

{

title:"رسالة ترحيبية",

count:1200,

},

{

title:"تذكير بالدفع",

count:850,

},

{

title:"عروض الجمعة",

count:2600,

},

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

حملات الرسائل النصية

</h1>

<div class="grid grid-cols-3 gap-6">

<div
v-for="item in sms"
:key="item.title"
class="rounded-xl border bg-white p-6">

<h2 class="font-bold">

{{ item.title }}

</h2>

<p class="mt-3">

عدد الرسائل

{{ item.count }}

</p>

</div>

</div>

</div>

</template>