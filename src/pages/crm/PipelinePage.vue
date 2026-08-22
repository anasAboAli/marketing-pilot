<script setup>
import PipelineColumn from "@/components/crm/PipelineColumn.vue";

import { usePipelineStore } from "@/stores/pipeline";

const pipeline = usePipelineStore();
</script>

<template>
  <div class="supSuper">
    <h1 class="mb-8 text-3xl font-bold">لوحة المبيعات</h1>

    <div class="super grid grid-cols-4 gap-6">
      <PipelineColumn
        v-for="stage in pipeline.stages"
        :key="stage.id"
        :stage="stage"
      />
    </div>
  </div>
</template>
<style>
/* .super {
}
.super div {

} */

@media (max-width: 668px) {
  .supSuper {
    margin-bottom: 100px;
  }
  .super {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    gap: 20px;
    justify-content: center;
  }
  .super div {
    width: 40%;
  }
  /* .div h2 {
    font-size: 20px;
  } */
}
</style>
