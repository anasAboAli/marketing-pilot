<script setup>

const user={

name:"أحمد محمد",

role:"مدير",

};

</script>

<template>

<div
class="flex items-center gap-3 rounded-xl border px-4 py-2">

<div
class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">

{{ user.name.charAt(0) }}

</div>

<div>

<h3 class="font-semibold">

{{ user.name }}

</h3>

<p class="text-sm text-slate-500">

{{ user.role }}

</p>

</div>

</div>

</template>