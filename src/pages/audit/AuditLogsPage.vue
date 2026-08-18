<script setup>

const logs=[

"قام أحمد بتعديل حملة الصيف",

"قام محمد بإضافة عميل",

"تم حذف حملة",

"تم تصدير تقرير",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

سجل النشاط

</h1>

<div class="rounded-2xl border bg-white p-6">

<div

v-for="log in logs"

:key="log"

class="border-b py-5 last:border-none">

{{ log }}

</div>

</div>

</div>

</template>