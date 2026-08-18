<script setup>

defineProps({

step:Number,

});

const steps=[

"معلومات الحملة",

"الجمهور",

"الميزانية",

"المحتوى",

"الجدولة",

"المراجعة",

];

</script>

<template>

<div class="mb-10 flex justify-between">

<div

v-for="(title,index) in steps"

:key="title"

class="flex flex-col items-center">

<div

:class="[

'flex h-10 w-10 items-center justify-center rounded-full font-bold',

step>=(index+1)

?'bg-blue-600 text-white'

:'bg-slate-200'

]">

{{ index+1 }}

</div>

<p class="mt-3 text-sm">

{{ title }}

</p>

</div>

</div>

</template>