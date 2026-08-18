<script setup>

const opportunities=[

{

id:1,

client:"شركة الريادة",

probability:"85%",

value:"18000",

},

{

id:2,

client:"شركة التقنية",

probability:"65%",

value:"23000",

},

{

id:3,

client:"متجر الأناقة",

probability:"45%",

value:"12000",

},

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

الفرص البيعية

</h1>

<div class="grid grid-cols-3 gap-6">

<div

v-for="item in opportunities"

:key="item.id"

class="rounded-xl border bg-white p-6">

<h2 class="font-bold">

{{ item.client }}

</h2>

<p class="mt-3">

احتمالية الإغلاق

{{ item.probability }}

</p>

<p class="mt-3">

القيمة

{{ item.value }} ر.س

</p>

</div>

</div>

</div>

</template>