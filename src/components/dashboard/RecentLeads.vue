<script setup>
import { onMounted, ref } from "vue";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";

const leads = ref([]);
const loading = ref(true);
const error = ref("");

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("ar-SA")} ر.س`;
}

async function loadRecentLeads() {
  try {
    loading.value = true;
    error.value = "";

    const response = await api.get(endpoints.dashboardRecentLeads);

    leads.value = response.data || [];
  } catch (e) {
    console.error("Failed to load recent leads:", e);

    error.value =
      e.response?.data?.error ||
      e.message ||
      "تعذر تحميل أحدث العملاء المحتملين";
  } finally {
    loading.value = false;
  }
}

onMounted(loadRecentLeads);
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 p-6">
      <h3 class="text-lg font-semibold text-slate-900">
        أحدث العملاء المحتملين
      </h3>

      <p class="mt-1 text-sm text-slate-500">
        أحدث العملاء المحتملين المسجلين
      </p>
    </div>

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
      v-else-if="leads.length === 0"
      class="py-10 text-center text-slate-500"
    >
      لا توجد بيانات متاحة
    </div>

    <table
      v-else
      class="w-full"
    >
      <thead>
        <tr class="text-right text-sm text-slate-500">
          <th class="p-4">الاسم</th>
          <th>الشركة</th>
          <th>الحالة</th>
          <th>القيمة</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="lead in leads"
          :key="lead.id"
          class="border-t border-slate-100"
        >
          <td class="p-4 font-medium text-slate-900">
            {{ lead.name }}
          </td>

          <td class="text-slate-600">
            {{ lead.company || "-" }}
          </td>

          <td>
            <span
              class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600"
            >
              {{ lead.status }}
            </span>
          </td>

          <td class="font-semibold">
            {{ formatMoney(lead.value) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>