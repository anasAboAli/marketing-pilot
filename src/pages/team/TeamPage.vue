<script setup>
const members = [
  {
    name: "أحمد محمد",
    role: "مدير الحسابات",
  },
  {
    name: "محمد علي",
    role: "مسؤول الحملات",
  },
  {
    name: "سارة خالد",
    role: "مصمم",
  },
  {
    name: "لينا يوسف",
    role: "كاتب محتوى",
  },
];
</script>

<template>

<div>

<div class="mb-8">

<h1 class="text-3xl font-bold">

الفريق

</h1>

<p class="mt-2 text-slate-500">

إدارة أعضاء الفريق

</p>

</div>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

<div
v-for="member in members"
:key="member.name"
class="rounded-2xl border bg-white p-6 shadow-sm">

<div
class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">

{{ member.name.charAt(0) }}

</div>

<h2 class="mt-5 text-center text-lg font-bold">

{{ member.name }}

</h2>

<p class="mt-2 text-center text-slate-500">

{{ member.role }}

</p>

</div>

</div>

</div>

</template>
