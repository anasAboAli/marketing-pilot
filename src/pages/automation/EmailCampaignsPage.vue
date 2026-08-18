<script setup>

const emails=[

{

name:"العرض الأسبوعي",

sent:5200,

opened:"61%",

},

{

name:"ترحيب بالعملاء",

sent:2300,

opened:"78%",

},

{

name:"خصومات الصيف",

sent:8400,

opened:"52%",

}

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

حملات البريد الإلكتروني

</h1>

<div class="rounded-2xl border bg-white">

<table class="w-full">

<thead>

<tr>

<th class="p-5 text-right">

الحملة

</th>

<th>

تم الإرسال

</th>

<th>

معدل الفتح

</th>

</tr>

</thead>

<tbody>

<tr
v-for="email in emails"
:key="email.name"
class="border-t">

<td class="p-5">

{{ email.name }}

</td>

<td>

{{ email.sent }}

</td>

<td>

{{ email.opened }}

</td>

</tr>

</tbody>

</table>

</div>

</div>

</template>