<script setup>

import { useWorkspaceStore } from "@/stores/workspace";

const workspace=useWorkspaceStore();

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

مساحات العمل

</h1>

<div class="grid grid-cols-3 gap-6">

<div

v-for="item in workspace.workspaces"

:key="item.id"

class="rounded-2xl border bg-white p-6">

<h2 class="text-xl font-bold">

{{ item.name }}

</h2>

<p class="mt-4">

الخطة

{{ item.plan }}

</p>

<p>

عدد الأعضاء

{{ item.members }}

</p>

<BaseButton

class="mt-6"

@click="workspace.select(item)">

فتح

</BaseButton>

</div>

</div>

</div>

</template>