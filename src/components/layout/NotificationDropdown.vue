<script setup>

const notifications=[

"تم إنشاء حملة",

"تم إضافة عميل",

"تم إنشاء تقرير",

];

</script>

<template>

<div
class="relative">

<button
class="rounded-xl border px-4 py-2">

🔔

</button>

<div
class="absolute left-0 mt-3 w-80 rounded-xl border bg-white shadow">

<div
v-for="item in notifications"
:key="item"
class="border-b p-4 last:border-none">

{{ item }}

</div>

</div>

</div>

</template>