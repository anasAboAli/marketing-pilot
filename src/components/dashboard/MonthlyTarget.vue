<script setup>
import { onMounted, ref } from "vue";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";

const percentage = ref(0);
const loading = ref(true);
const error = ref("");

async function loadBudgetUsage() {
  try {
    loading.value = true;
    error.value = "";

    const response = await api.get(endpoints.dashboardOverview);

    const totalBudget = Number(response.data?.totalBudget || 0);
    const totalSpent = Number(response.data?.totalSpent || 0);

    if (totalBudget <= 0) {
      percentage.value = 0;
      return;
    }

    percentage.value = Math.min(
      100,
      Math.round((totalSpent / totalBudget) * 100)
    );
  } catch (e) {
    console.error("Failed to load budget usage:", e);

    error.value =
      e.response?.data?.error ||
      e.message ||
      "تعذر تحميل نسبة استهلاك الميزانية";
  } finally {
    loading.value = false;
  }
}

onMounted(loadBudgetUsage);
</script>

<template>
  <div class="rounded-2xl border bg-white p-6 shadow-sm">
    <h2 class="mb-5 text-xl font-bold">
      نسبة استهلاك الميزانية
    </h2>

    <div
      v-if="loading"
      class="flex h-56 items-center justify-center text-slate-500"
    >
      جاري التحميل...
    </div>

    <div
      v-else-if="error"
      class="flex h-56 items-center justify-center rounded-xl bg-red-50 text-red-700"
    >
      {{ error }}
    </div>

    <div v-else class="flex justify-center">
      <div
        class="flex h-56 w-56 items-center justify-center rounded-full border-[14px] border-blue-600"
      >
        <div class="text-center">
          <h2 class="text-5xl font-bold">
            {{ percentage }}%
          </h2>

          <p class="mt-3 text-slate-500">
            من إجمالي الميزانيات
          </p>
        </div>
      </div>
    </div>
  </div>
</template>