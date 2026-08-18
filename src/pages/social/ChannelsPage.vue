<script setup>

const channels=[

"Facebook",

"Instagram",

"LinkedIn",

"TikTok",

"X",

"Snapchat",

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

القنوات

</h1>

<div class="grid grid-cols-3 gap-6">

<div

v-for="channel in channels"

:key="channel"

class="rounded-xl border bg-white p-6 text-center">

<div class="mb-4 text-4xl">

🌐

</div>

<h2>

{{ channel }}

</h2>

</div>

</div>

</div>

</template>