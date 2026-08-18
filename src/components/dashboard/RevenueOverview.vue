<script setup>
const cards = [
  {
    title: "إجمالي الإيرادات",
    value: "148,250 ر.س",
    growth: "+18%",
  },
  {
    title: "إجمالي المصروف",
    value: "84,600 ر.س",
    growth: "+6%",
  },
  {
    title: "صافي الأرباح",
    value: "63,650 ر.س",
    growth: "+24%",
  },
];
</script>

<template>
  <div class="grid grid-cols-3 gap-6">

    <div
      v-for="card in cards"
      :key="card.title"
      class="rounded-2xl border bg-white p-6 shadow-sm"
    >
      <p class="text-slate-500">

        {{ card.title }}

      </p>

      <h2 class="mt-4 text-3xl font-bold">

        {{ card.value }}

      </h2>

      <span class="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-green-700">

        {{ card.growth }}

      </span>

    </div>

  </div>
</template>