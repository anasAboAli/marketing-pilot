<script setup>

const user={

name:"أحمد محمد",

email:"admin@test.com",

role:"مدير",

phone:"0501234567",

};

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

الملف الشخصي

</h1>

<div class="rounded-2xl bg-white border p-8">

<div class="grid grid-cols-2 gap-6">

<div>

<label>الاسم</label>

<input
class="mt-2 w-full rounded-xl border px-4 py-3"
v-model="user.name">

</div>

<div>

<label>البريد الإلكتروني</label>

<input
class="mt-2 w-full rounded-xl border px-4 py-3"
v-model="user.email">

</div>

<div>

<label>رقم الهاتف</label>

<input
class="mt-2 w-full rounded-xl border px-4 py-3"
v-model="user.phone">

</div>

<div>

<label>الصلاحية</label>

<input
disabled
class="mt-2 w-full rounded-xl border px-4 py-3"
v-model="user.role">

</div>

</div>

</div>

</div>

</template>