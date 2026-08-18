<script setup>
import { useTasksStore } from "@/stores/tasks";

const tasks = useTasksStore();

const columns = [

{
title:"قيد التنفيذ",
key:"todo",
},

{
title:"جاري العمل",
key:"progress",
},

{
title:"منتهية",
key:"done",
},

];
</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

لوحة المهام

</h1>

<div class="grid grid-cols-3 gap-6">

<div

v-for="column in columns"

:key="column.key"

class="rounded-2xl bg-slate-100 p-4">

<h2 class="mb-6 text-lg font-bold">

{{ column.title }}

</h2>

<div

v-for="task in tasks.tasks.filter(t=>t.status===column.key)"

:key="task.id"

class="mb-4 rounded-xl bg-white p-5 shadow">

<h3 class="font-semibold">

{{ task.title }}

</h3>

<p class="mt-2 text-sm text-slate-500">

{{ task.assignee }}

</p>

</div>

</div>

</div>

</div>

</template>