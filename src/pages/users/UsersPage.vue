<script setup>
import StatusBadge from "@/components/badge/StatusBadge.vue";

const users=[

{

id:1,

name:"أحمد محمد",

role:"مدير",

status:"نشط",

},

{

id:2,

name:"محمد علي",

role:"مسوق",

status:"نشط",

},

{

id:3,

name:"سارة خالد",

role:"مصمم",

status:"موقوف",

}

];

</script>

<template>

<div>

<div class="mb-8 flex items-center justify-between">

<h1 class="text-3xl font-bold">

المستخدمون

</h1>

<RouterLink
to="/users/create"
class="rounded-xl bg-blue-600 px-5 py-3 text-white">

إضافة مستخدم

</RouterLink>

</div>

<div class="rounded-2xl border bg-white shadow-sm">

<table class="w-full">

<thead>

<tr>

<th class="p-5 text-right">الاسم</th>

<th>الدور</th>

<th>الحالة</th>

<th>الإجراءات</th>

</tr>

</thead>

<tbody>

<tr
v-for="user in users"
:key="user.id"
class="border-t">

<td class="p-5">

{{ user.name }}

</td>

<td>

{{ user.role }}

</td>

<td>

<StatusBadge
:status="user.status"/>

</td>

<td>

<RouterLink
:to="`/users/${user.id}`">

عرض

</RouterLink>

</td>

</tr>

</tbody>

</table>

</div>

</div>

</template>
