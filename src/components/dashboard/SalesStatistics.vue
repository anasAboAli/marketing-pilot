<script setup>

const data=[

{

title:"Google Ads",

value:"48,000 ر.س",

},

{

title:"Meta Ads",

value:"39,500 ر.س",

},

{

title:"TikTok Ads",

value:"27,000 ر.س",

},

{

title:"Snapchat",

value:"18,300 ر.س",

},

];

</script>

<template>

<div class="rounded-2xl border bg-white p-6 shadow-sm">

<h2 class="mb-6 text-xl font-bold">

الإيرادات حسب المنصة

</h2>

<div
v-for="item in data"
:key="item.title"
class="mb-6">

<div class="mb-2 flex justify-between">

<span>

{{ item.title }}

</span>

<span>

{{ item.value }}

</span>

</div>

<div class="h-2 rounded-full bg-slate-100">

<div
class="h-2 rounded-full bg-blue-600"
style="width:70%">

</div>

</div>

</div>

</div>

</template>