<script setup>

const activities=[

"تم الاتصال بالعميل",

"تم إرسال عرض السعر",

"تم تحديد اجتماع",

"تم توقيع العقد",

"تم إرسال الفاتورة",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

أنشطة العملاء

</h1>

<div class="space-y-4">

<div

v-for="activity in activities"

:key="activity"

class="rounded-xl border bg-white p-5">

{{ activity }}

</div>

</div>

</div>

</template>