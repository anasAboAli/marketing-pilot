<script setup>

import { useAutomationStore } from "@/stores/automation";

const automation=useAutomationStore();

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

الأتمتة التسويقية

</h1>

<div class="grid grid-cols-3 gap-6">

<div
v-for="workflow in automation.workflows"
:key="workflow.id"
class="rounded-2xl border bg-white p-6">

<h2 class="font-bold">

{{ workflow.name }}

</h2>

<p class="mt-4">

المحفز

{{ workflow.trigger }}

</p>

<p class="mt-2">

الإجراء

{{ workflow.action }}

</p>

<span
class="mt-4 inline-block rounded-full bg-green-100 px-3 py-1 text-green-700">

{{ workflow.status }}

</span>

</div>

</div>

</div>

</template>