<script setup>

const members=[

{

name:"أحمد محمد",

role:"المدير",

},

{

name:"محمد علي",

role:"مدير الحملات",

},

{

name:"سارة خالد",

role:"المصمم",

},

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

أعضاء الفريق

</h1>

<div class="grid grid-cols-3 gap-6">

<div

v-for="member in members"

:key="member.name"

class="rounded-xl border bg-white p-6">

<div

class="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">

{{ member.name.charAt(0) }}

</div>

<h2 class="mt-5 font-bold">

{{ member.name }}

</h2>

<p class="mt-2 text-slate-500">

{{ member.role }}

</p>

</div>

</div>

</div>

</template>