<script setup>
import VueApexCharts from "vue3-apexcharts";

const series = [
  {
    name: "Revenue",
    data: [12000, 18000, 15000, 24000, 21000, 30000, 48250],
  },
];

const chartOptions = {
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
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
    ],
  },

  yaxis: {
    labels: {
      formatter: value => `$${value / 1000}k`,
    },
  },

  legend: {
    show: false,
  },
};
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

    <VueApexCharts
      type="line"
      height="320"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>