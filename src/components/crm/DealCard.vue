<script setup>
defineProps({
  deal: {
    type: Object,
    required: true,
  },

  updating: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["open"]);

function handleDragStart(event, deal) {
  event.dataTransfer.effectAllowed = "move";

  event.dataTransfer.setData(
    "text/plain",
    String(deal.id)
  );
}
</script>

<template>
  <article
    :draggable="!updating"
    class="deal-card group relative w-full min-w-0 cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:cursor-grabbing"
    :class="{
      'pointer-events-none opacity-60': updating,
    }"
    @click="$emit('open', deal)"
    @dragstart="handleDragStart($event, deal)"
  >

    <!-- Updating Overlay -->
    <div
      v-if="updating"
      class="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-[1px]"
    >
      <div class="flex items-center gap-2 text-xs font-medium text-slate-600">
        <div
          class="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
        ></div>

        جاري التحديث...
      </div>
    </div>

    <!-- Header -->
    <div
      class="flex items-start justify-between gap-3"
    >
      <div class="min-w-0 flex-1">
        <h3
          class="truncate text-sm font-bold text-slate-900"
          :title="deal.name"
        >
          {{ deal.name || "بدون اسم" }}
        </h3>

        <p
          v-if="deal.company"
          class="mt-1 truncate text-xs text-slate-500"
          :title="deal.company"
        >
          {{ deal.company }}
        </p>
      </div>

      <span
        class="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-600"
      >
        #{{ deal.id }}
      </span>
    </div>

    <!-- Value -->
    <div
      class="mt-4 rounded-xl bg-slate-50 p-3"
    >
      <p class="text-xs text-slate-500">
        قيمة الفرصة
      </p>

      <p
        class="mt-1 text-lg font-bold text-slate-900"
      >
        {{ Number(deal.value || 0).toLocaleString() }}

        <span
          class="text-xs font-medium text-slate-500"
        >
          ر.س
        </span>
      </p>
    </div>

    <!-- Tags -->
    <div
      class="mt-3 flex flex-wrap gap-2"
    >
      <span
        v-if="deal.source"
        class="max-w-full truncate rounded-lg bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-700"
        :title="deal.source"
      >
        {{ deal.source }}
      </span>

      <span
        v-if="deal.assignedTo"
        class="max-w-full truncate rounded-lg bg-violet-50 px-2 py-1 text-[11px] font-medium text-violet-700"
        :title="deal.assignedTo"
      >
        {{ deal.assignedTo }}
      </span>
    </div>

    <!-- Footer -->
    <div
      class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3"
    >
      <span
        class="text-xs text-slate-400 transition-colors group-hover:text-slate-600"
      >
        عرض التفاصيل
      </span>

      <!-- RTL arrow -->
      <svg
        class="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-[-3px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M15 18l-6-6 6-6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

  </article>
</template>