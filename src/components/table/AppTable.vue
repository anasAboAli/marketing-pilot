<script setup>

defineProps({

headers:Array,

rows:Array,

});

</script>

<template>

<table class="w-full">

<thead class="bg-slate-50">

<tr>

<th
v-for="header in headers"
:key="header"
class="p-4 text-right">

{{ header }}

</th>

</tr>

</thead>

<tbody>

<tr
v-for="row in rows"
:key="row.id"
class="border-t">

<td
v-for="value in Object.values(row)"
:key="value"
class="p-4">

{{ value }}

</td>

</tr>

</tbody>

</table>

</template>