<script setup>
import { onMounted, ref } from "vue";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";

const employees = ref([]);
const loading = ref(true);
const error = ref("");

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("ar-SA")} ر.س`;
}

async function loadTopEmployees() {
  try {
    loading.value = true;
    error.value = "";

    const response = await api.get(endpoints.dashboardTopEmployees);

    employees.value = response.data || [];
  } catch (e) {
    console.error("Failed to load top employees:", e);

    error.value =
      e.response?.data?.error ||
      e.message ||
      "تعذر تحميل بيانات الموظفين";
  } finally {
    loading.value = false;
  }
}

onMounted(loadTopEmployees);
</script>

<template>
  <div class="rounded-2xl border bg-white p-6 shadow-sm">
    <h2 class="mb-6 text-xl font-bold">
      أفضل الموظفين حسب قيمة العملاء المحتملين
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
      v-else-if="employees.length === 0"
      class="py-10 text-center text-slate-500"
    >
      لا توجد بيانات متاحة
    </div>

    <template v-else>
      <div
        v-for="employee in employees"
        :key="employee.name"
        class="mb-5 flex items-center justify-between last:mb-0"
      >
        <div>
          <h3 class="font-semibold">
            {{ employee.name }}
          </h3>
        </div>

        <div class="font-medium">
          {{ formatMoney(employee.totalValue) }}
        </div>
      </div>
    </template>
  </div>
</template>