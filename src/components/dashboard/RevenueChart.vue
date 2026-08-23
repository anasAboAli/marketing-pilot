<script setup>
import { onMounted, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";

const loading = ref(true);
const error = ref("");

const series = ref([
  {
    name: "الإنفاق",
    data: [],
  },
]);

const months = ref([]);

const monthNames = {
  "01": "يناير",
  "02": "فبراير",
  "03": "مارس",
  "04": "أبريل",
  "05": "مايو",
  "06": "يونيو",
  "07": "يوليو",
  "08": "أغسطس",
  "09": "سبتمبر",
  "10": "أكتوبر",
  "11": "نوفمبر",
  "12": "ديسمبر",
};

const chartOptions = ref({
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  stroke: {
    curve: "smooth",
    width: 3,
  },

  colors: ["#2563eb"],

  grid: {
    borderColor: "#e2e8f0",
  },

  dataLabels: {
    enabled: false,
  },

  xaxis: {
    categories: [],
  },

  yaxis: {
    labels: {
      formatter: (value) => `${Number(value / 1000).toFixed(1)}k`,
    },
  },

  legend: {
    show: false,
  },

  tooltip: {
    y: {
      formatter: (value) =>
        `${Number(value || 0).toLocaleString("ar-SA")} ر.س`,
    },
  },
});

function formatMonth(month) {
  const monthNumber = month.split("-")[1];

  return monthNames[monthNumber] || month;
}

async function loadMonthlyRevenue() {
  try {
    loading.value = true;
    error.value = "";

    const response = await api.get(endpoints.dashboardMonthlyRevenue);

    const data = response.data || [];

    months.value = data.map((item) => formatMonth(item.month));

    series.value = [
      {
        name: "الإنفاق",
        data: data.map((item) => Number(item.totalSpent || 0)),
      },
    ];

    chartOptions.value = {
      ...chartOptions.value,
      xaxis: {
        ...chartOptions.value.xaxis,
        categories: months.value,
      },
    };
  } catch (e) {
    console.error("Failed to load monthly revenue:", e);

    error.value =
      e.response?.data?.error ||
      e.message ||
      "تعذر تحميل بيانات الإيرادات الشهرية";
  } finally {
    loading.value = false;
  }
}

onMounted(loadMonthlyRevenue);
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-slate-900">
        Revenue Overview
      </h3>

      <p class="text-sm text-slate-500">
        Monthly revenue performance
      </p>
    </div>

    <div
      v-if="loading"
      class="flex h-[320px] items-center justify-center text-slate-500"
    >
      جاري تحميل البيانات...
    </div>

    <div
      v-else-if="error"
      class="flex h-[320px] items-center justify-center rounded-xl bg-red-50 text-red-700"
    >
      {{ error }}
    </div>

    <VueApexCharts
      v-else
      type="line"
      height="320"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>