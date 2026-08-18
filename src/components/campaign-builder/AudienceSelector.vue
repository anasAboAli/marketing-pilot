<script setup>

const audiences=[

"رجال",

"نساء",

"18-24",

"25-34",

"35-44",

"الرياض",

"جدة",

"الدمام",

"مهتمون بالتسويق",

"مهتمون بالعقارات",

"مهتمون بالصحة",

];

</script>

<template>

<div>

<h2 class="mb-6 text-xl font-bold">

الجمهور المستهدف

</h2>

<div class="grid grid-cols-3 gap-4">

<label

v-for="audience in audiences"

:key="audience"

class="rounded-xl border p-4">

<input type="checkbox">

<span class="mr-2">

{{ audience }}

</span>

</label>

</div>

</div>

</template>