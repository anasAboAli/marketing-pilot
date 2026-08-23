<script setup>
import { onMounted, ref } from "vue";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";

const data = ref([]);
const loading = ref(true);
const error = ref("");

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("ar-SA")} ر.س`;
}

function getPercentage(value) {
  const maxValue = Math.max(
    ...data.value.map((item) => Number(item.totalSpent || 0)),
    0
  );

  if (maxValue === 0) {
    return 0;
  }

  return Math.round((Number(value || 0) / maxValue) * 100);
}

async function loadRevenueByPlatform() {
  try {
    loading.value = true;
    error.value = "";

    const response = await api.get(
      endpoints.dashboardRevenueByPlatform
    );

    data.value = response.data || [];
  } catch (e) {
    console.error("Failed to load revenue by platform:", e);

    error.value =
      e.response?.data?.error ||
      e.message ||
      "تعذر تحميل بيانات المنصات";
  } finally {
    loading.value = false;
  }
}

onMounted(loadRevenueByPlatform);
</script>

<template>
  <div class="rounded-2xl border bg-white p-6 shadow-sm">
    <h2 class="mb-6 text-xl font-bold">
      الإنفاق حسب المنصة
    </h2>

    <div
      v-if="loading"
      class="py-10 text-center text-slate-500"
    >
      جاري تحميل البيانات...
    </div>

    <div
      v-else-if="error"
      class="rounded-xl bg-red-50 p-4 text-red-700"
    >
      {{ error }}
    </div>

    <div
      v-else-if="data.length === 0"
      class="py-10 text-center text-slate-500"
    >
      لا توجد بيانات متاحة
    </div>

    <template v-else>
      <div
        v-for="item in data"
        :key="item.platform"
        class="mb-6 last:mb-0"
      >
        <div class="mb-2 flex justify-between">
          <span>
            {{ item.platform }}
          </span>

          <span>
            {{ formatMoney(item.totalSpent) }}
          </span>
        </div>

        <div class="h-2 rounded-full bg-slate-100">
          <div
            class="h-2 rounded-full bg-blue-600 transition-all"
            :style="{
              width: `${getPercentage(item.totalSpent)}%`,
            }"
          ></div>
        </div>
      </div>
    </template>
  </div>
</template>