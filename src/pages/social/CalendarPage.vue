<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

تقويم المحتوى

</h1>

<div class="grid grid-cols-7 gap-4">

<div

v-for="day in 35"

:key="day"

class="h-32 rounded-xl border bg-white p-3">

<div class="font-bold">

{{ day }}

</div>

</div>

</div>

</div>

</template>