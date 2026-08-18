<template>

<div class="rounded-2xl border bg-white p-6 shadow-sm">

<h2 class="mb-6 text-xl font-bold">

التقويم

</h2>

<div class="grid grid-cols-7 gap-3">

<div
v-for="day in 35"
:key="day"
class="flex h-10 items-center justify-center rounded-lg hover:bg-blue-50">

{{ day }}

</div>

</div>

</div>

</template>