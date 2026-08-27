<script setup>
import DealCard from "./DealCard.vue";

defineProps({
  stage: {
    type: Object,
    required: true,
  },

  updatingLeadId: {
    type: [Number, String, null],
    default: null,
  },
});

defineEmits(["open-lead", "move-lead"]);
</script>

<template>
  <section class="pipeline-column">

    <!-- Cards Grid -->
    <div
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      <DealCard
        v-for="lead in stage.items"
        :key="lead.id"
        :deal="lead"
        :updating="updatingLeadId === lead.id"
        @open="$emit('open-lead', $event)"
      />
    </div>

    <!-- Empty -->
    <div
      v-if="stage.items.length === 0"
      class="flex min-h-[280px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 p-6 text-center"
      @dragover.prevent
      @drop.prevent="
        $emit(
          'move-lead',
          $event.dataTransfer.getData('text/plain'),
          stage.status,
        )
      "
    >
      <div>
        <div
          class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-slate-300 shadow-sm"
        >
          ↓
        </div>

        <p class="text-sm font-medium text-slate-400">
          لا يوجد عملاء في هذه المرحلة
        </p>

        <p class="mt-1 text-xs text-slate-300">
          اسحب العميل إلى تبويب هذه المرحلة لنقله
        </p>
      </div>
    </div>

  </section>
</template>

<style scoped>
.pipeline-column {
  width: 100%;
}
</style>