<script setup>

const notifications=[

{

title:"تم إنشاء حملة",

time:"قبل ساعة"

},

{

title:"تم تحديث تقرير",

time:"قبل يوم"

},

{

title:"تم إضافة عميل",

time:"قبل يومين"

}

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

الإشعارات

</h1>

<div class="space-y-4">

<div
v-for="notification in notifications"
:key="notification.title"
class="rounded-xl border bg-white p-5">

<h2 class="font-bold">

{{ notification.title }}

</h2>

<p class="mt-2 text-slate-500">

{{ notification.time }}

</p>

</div>

</div>

</div>

</template>