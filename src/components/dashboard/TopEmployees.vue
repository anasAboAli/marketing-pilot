<script setup>

const employees=[

{

name:"أحمد محمد",

sales:"42,000 ر.س",

},

{

name:"محمد علي",

sales:"38,500 ر.س",

},

{

name:"سارة خالد",

sales:"31,000 ر.س",

},

{

name:"عبدالله يوسف",

sales:"28,600 ر.س",

}

];

</script>

<template>

<div class="rounded-2xl border bg-white p-6 shadow-sm">

<h2 class="mb-6 text-xl font-bold">

أفضل الموظفين

</h2>

<div
v-for="employee in employees"
:key="employee.name"
class="mb-5 flex items-center justify-between">

<div>

<h3 class="font-semibold">

{{ employee.name }}

</h3>

</div>

<div>

{{ employee.sales }}

</div>

</div>

</div>

</template>