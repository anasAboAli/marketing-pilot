<script setup>

import DealCard from "./DealCard.vue";

defineProps({

stage:Object,

});

</script>

<template>

<div class="rounded-2xl bg-slate-100 p-4">

<h2 class="mb-5 text-lg font-bold">

{{ stage.name }}

</h2>

<DealCard

v-for="deal in stage.items"

:key="deal.id"

:deal="deal"/>

</div>

</template>