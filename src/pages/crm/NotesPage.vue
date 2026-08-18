<script setup>

const notes=[

{

client:"شركة الريادة",

note:"طلب العميل إضافة حملة على تيك توك.",

},

{

client:"عيادات النخبة",

note:"سيتم التواصل الأسبوع القادم.",

},

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

ملاحظات العملاء

</h1>

<div class="space-y-5">

<div

v-for="note in notes"

:key="note.client"

class="rounded-xl border bg-white p-6">

<h2 class="font-bold">

{{ note.client }}

</h2>

<p class="mt-3 text-slate-600">

{{ note.note }}

</p>

</div>

</div>

</div>

</template>