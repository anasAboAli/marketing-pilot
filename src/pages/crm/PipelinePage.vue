<script setup>

import PipelineColumn from "@/components/crm/PipelineColumn.vue";

import { usePipelineStore } from "@/stores/pipeline";

const pipeline=usePipelineStore();

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

لوحة المبيعات

</h1>

<div class="grid grid-cols-4 gap-6">

<PipelineColumn

v-for="stage in pipeline.stages"

:key="stage.id"

:stage="stage"/>

</div>

</div>

</template>