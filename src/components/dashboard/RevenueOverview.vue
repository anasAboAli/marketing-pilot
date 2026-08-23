<script setup>
import { onMounted, ref } from "vue";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";

const loading = ref(true);
const error = ref("");

const overview = ref({
  totalBudget: 0,
  totalSpent: 0,
  netProfit: 0,
});

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("ar-SA")} ر.س`;
}

async function loadOverview() {
  try {
    loading.value = true;
    error.value = "";

    const response = await api.get(endpoints.dashboardOverview);

    overview.value = response.data;
  } catch (e) {
    error.value =
      e.response?.data?.error || e.message || "تعذر تحميل إحصائيات لوحة التحكم";
  } finally {
    loading.value = false;
  }
}

onMounted(loadOverview);
</script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
    <!-- Loading -->

    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-500 shadow-sm md:col-span-3"
    >
      جاري تحميل الإحصائيات...
    </div>

    <!-- Error -->

    <div
      v-else-if="error"
      class="rounded-2xl bg-red-50 p-5 text-red-700 md:col-span-3"
    >
      {{ error }}
    </div>

    <!-- Cards -->

    <template v-else>
      <!-- Total Revenue -->

      <div
        class="parent rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <p class="text-slate-500">إجمالي الميزانيات</p>

        <h2 class="whenThisScreen mt-4 text-3xl font-bold">
          {{ formatMoney(overview.totalBudget) }}
        </h2>

        <span
          class="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700"
        >
          إجمالي الميزانيات
        </span>
      </div>

      <!-- Total Spent -->

      <div
        class="parent rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <p class="text-slate-500">إجمالي المصروف</p>

        <h2 class="whenThisScreen mt-4 text-3xl font-bold">
          {{ formatMoney(overview.totalSpent) }}
        </h2>

        <span
          class="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700"
        >
          إجمالي الإنفاق
        </span>
      </div>

      <!-- Net Profit -->

      <div
        class="parent rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <p class="text-slate-500">المتبقي من الميزانيات</p>

        <h2 class="whenThisScreen mt-4 text-3xl font-bold">
          {{ formatMoney(overview.netProfit) }}
        </h2>

        <span
          class="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700"
        >
          المتبقي من الميزانيات
        </span>
      </div>
    </template>
  </div>
</template>

<style>
@media (max-width: 768px) {
  .parent {
    padding: 10px 0;
    text-align: center;
  }

  .whenThisScreen {
    padding: 10px;
    font-size: 14px;
  }
}
</style>
