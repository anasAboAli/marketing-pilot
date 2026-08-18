<script setup>

const roles=[

"المدير",

"مدير التسويق",

"مدير المبيعات",

"كاتب المحتوى",

"المصمم",

"المحاسب",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

الأدوار

</h1>

<div class="grid grid-cols-3 gap-5">

<div

v-for="role in roles"

:key="role"

class="rounded-xl border bg-white p-6">

{{ role }}

</div>

</div>

</div>

</template>