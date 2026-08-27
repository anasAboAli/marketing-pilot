<script setup>
import { computed, onMounted, ref } from "vue";
import reportsService from "@/services/reports.service";

const loading = ref(true);
const error = ref("");
const report = ref(null);

const selectedPeriod = ref("this-month");
const customFrom = ref("");
const customTo = ref("");

const aiLoading = ref(false);
const aiError = ref("");
const aiAnalysis = ref(null);

const periods = [
  {
    value: "this-month",
    label: "هذا الشهر",
  },
  {
    value: "last-month",
    label: "الشهر الماضي",
  },
  {
    value: "last-3-months",
    label: "آخر 3 أشهر",
  },
  {
    value: "last-12-months",
    label: "آخر 12 شهر",
  },
  {
    value: "custom",
    label: "فترة مخصصة",
  },
];

const periodLabel = computed(() => {
  return (
    periods.find(
      (period) => period.value === selectedPeriod.value,
    )?.label || "هذا الشهر"
  );
});

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("ar-SA")} ر.س`;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("ar-SA");
}

function formatPercent(value) {
  return `${Number(value || 0).toLocaleString("ar-SA", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}%`;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad(
    date.getMonth() + 1,
  )}-${pad(date.getDate())}`;
}

function getPeriodDates() {
  const now = new Date();

  if (selectedPeriod.value === "custom") {
    return {
      from: customFrom.value,
      to: customTo.value,
    };
  }

  if (selectedPeriod.value === "this-month") {
    return {
      from: formatDate(
        new Date(now.getFullYear(), now.getMonth(), 1),
      ),
      to: formatDate(
        new Date(now.getFullYear(), now.getMonth() + 1, 0),
      ),
    };
  }

  if (selectedPeriod.value === "last-month") {
    return {
      from: formatDate(
        new Date(now.getFullYear(), now.getMonth() - 1, 1),
      ),
      to: formatDate(
        new Date(now.getFullYear(), now.getMonth(), 0),
      ),
    };
  }

  if (selectedPeriod.value === "last-3-months") {
    return {
      from: formatDate(
        new Date(now.getFullYear(), now.getMonth() - 2, 1),
      ),
      to: formatDate(
        new Date(now.getFullYear(), now.getMonth() + 1, 0),
      ),
    };
  }

  if (selectedPeriod.value === "last-12-months") {
    return {
      from: formatDate(
        new Date(now.getFullYear(), now.getMonth() - 11, 1),
      ),
      to: formatDate(
        new Date(now.getFullYear(), now.getMonth() + 1, 0),
      ),
    };
  }

  return {
    from: "",
    to: "",
  };
}

async function loadReport() {
  const { from, to } = getPeriodDates();

  if (!from || !to) {
    error.value = "يرجى تحديد تاريخ البداية والنهاية.";
    return;
  }

  if (from > to) {
    error.value = "تاريخ البداية يجب أن يكون قبل تاريخ النهاية.";
    return;
  }

  loading.value = true;
  error.value = "";
  aiError.value = "";
  aiAnalysis.value = null;

  try {
    report.value = await reportsService.getSummary(from, to);
  } catch (err) {
    console.error("Failed to load report:", err);

    error.value =
      err?.response?.data?.error ||
      err?.message ||
      "تعذر تحميل التقرير.";
  } finally {
    loading.value = false;
  }
}

async function generateAIAnalysis() {
  if (!report.value) {
    return;
  }

  aiLoading.value = true;
  aiError.value = "";
  aiAnalysis.value = null;

  try {
    aiAnalysis.value =
      await reportsService.analyzeWithAI(report.value);
  } catch (err) {
    console.error("Failed to generate AI analysis:", err);

    aiError.value =
      err?.response?.data?.error ||
      err?.message ||
      "تعذر إنشاء التحليل الذكي حاليًا.";
  } finally {
    aiLoading.value = false;
  }
}

function printReport() {
  window.print();
}

function exportCsv() {
  if (!report.value) {
    return;
  }

  const rows = [
    ["البند", "القيمة"],

    [
      "الفترة",
      `${report.value.period.from} - ${report.value.period.to}`,
    ],

    [
      "إجمالي الميزانية",
      report.value.overview.totalBudget,
    ],

    [
      "إجمالي الإنفاق",
      report.value.overview.totalSpent,
    ],

    [
      "المتبقي",
      report.value.overview.remainingBudget,
    ],

    [
      "إجمالي العملاء المحتملين",
      report.value.overview.totalLeads,
    ],

    [
      "العملاء المؤهلون",
      report.value.overview.qualifiedLeads,
    ],

    [
      "معدل التحويل",
      `${report.value.overview.conversionRate}%`,
    ],

    [
      "قيمة الفرص",
      report.value.overview.totalLeadValue,
    ],

    [
      "استخدام الميزانية",
      `${report.value.overview.budgetUsage}%`,
    ],

    [],

    [
      "الحملة",
      "العميل",
      "المنصة",
      "الميزانية",
      "الإنفاق",
      "النقرات",
      "التحويلات",
      "الحالة",
    ],

    ...report.value.campaigns.map((campaign) => [
      campaign.name,
      campaign.client,
      campaign.platform,
      campaign.budget,
      campaign.spent,
      campaign.clicks,
      campaign.conversions,
      campaign.status,
    ]),
  ];

  const csv = rows
    .map((row) =>
      row
        .map(
          (cell) =>
            `"${String(cell ?? "").replaceAll('"', '""')}"`,
        )
        .join(","),
    )
    .join("\n");

  const blob = new Blob(["\ufeff" + csv], {
    type: "text/csv;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "marketpilot-report.csv";
  link.click();

  URL.revokeObjectURL(url);
}

onMounted(loadReport);
</script>

<template>
  <section class="space-y-6 pb-24 lg:pb-8">
    <!-- Header -->
    <div
      class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between print:mb-4"
    >
      <div>
        <p class="text-sm font-semibold text-blue-600">
          مركز التقارير
        </p>

        <h1
          class="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          التقارير والتحليلات
        </h1>

        <p class="mt-2 text-sm text-slate-500 sm:text-base">
          تحليل أداء الحملات والعملاء المحتملين خلال الفترة المحددة.
        </p>
      </div>

      <div class="flex flex-wrap gap-2 print:hidden">
        <button
          type="button"
          @click="printReport"
          class="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:flex-none"
        >
          طباعة / PDF
        </button>

        <button
          type="button"
          @click="exportCsv"
          :disabled="!report"
          class="inline-flex flex-1 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          تصدير CSV
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm print:hidden"
    >
      <div
        class="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_1fr_auto]"
      >
        <div>
          <label
            class="mb-2 block text-xs font-semibold text-slate-500"
          >
            الفترة
          </label>

          <select
            v-model="selectedPeriod"
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          >
            <option
              v-for="period in periods"
              :key="period.value"
              :value="period.value"
            >
              {{ period.label }}
            </option>
          </select>
        </div>

        <div v-if="selectedPeriod === 'custom'">
          <label
            class="mb-2 block text-xs font-semibold text-slate-500"
          >
            من
          </label>

          <input
            v-model="customFrom"
            type="date"
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div v-if="selectedPeriod === 'custom'">
          <label
            class="mb-2 block text-xs font-semibold text-slate-500"
          >
            إلى
          </label>

          <input
            v-model="customTo"
            type="date"
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div
          :class="
            selectedPeriod !== 'custom'
              ? 'lg:col-start-4'
              : ''
          "
          class="flex items-end"
        >
          <button
            type="button"
            @click="loadReport"
            :disabled="loading"
            class="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ loading ? "جاري التحميل..." : "تطبيق التقرير" }}
          </button>
        </div>
      </div>

      <div
        v-if="selectedPeriod !== 'custom'"
        class="mt-3 text-xs text-slate-400"
      >
        الفترة الحالية:
        <span class="font-semibold text-slate-600">
          {{ periodLabel }}
        </span>
      </div>
    </div>

    <!-- Error -->
    <div
      v-if="error"
      class="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      {{ error }}
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="flex min-h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div class="flex items-center gap-3 text-sm text-slate-500">
        <div
          class="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
        ></div>

        جاري تجهيز التقرير...
      </div>
    </div>

    <!-- Report -->
    <template v-else-if="report">
      <!-- Period -->
      <div
        class="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p class="text-xs text-slate-400">
            الفترة المحددة
          </p>

          <p class="mt-1 text-sm font-semibold text-slate-800">
            {{ report.period.from }}
            →
            {{ report.period.to }}
          </p>
        </div>

        <span
          class="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
        >
          {{ periodLabel }}
        </span>
      </div>

      <!-- KPIs -->
      <div
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-sm text-slate-500">
            إجمالي الميزانية
          </p>

          <p
            class="mt-2 text-xl font-bold text-slate-900 sm:text-2xl"
          >
            {{ formatMoney(report.overview.totalBudget) }}
          </p>

          <p class="mt-2 text-xs text-slate-400">
            الميزانية المخصصة للحملات
          </p>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-sm text-slate-500">
            إجمالي الإنفاق
          </p>

          <p
            class="mt-2 text-xl font-bold text-slate-900 sm:text-2xl"
          >
            {{ formatMoney(report.overview.totalSpent) }}
          </p>

          <p class="mt-2 text-xs text-slate-400">
            استخدام الميزانية:
            {{ formatPercent(report.overview.budgetUsage) }}
          </p>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-sm text-slate-500">
            العملاء المحتملون
          </p>

          <p
            class="mt-2 text-xl font-bold text-slate-900 sm:text-2xl"
          >
            {{ formatNumber(report.overview.totalLeads) }}
          </p>

          <p class="mt-2 text-xs text-slate-400">
            {{ formatNumber(report.overview.qualifiedLeads) }}
            مؤهل
          </p>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-sm text-slate-500">
            قيمة الفرص
          </p>

          <p
            class="mt-2 text-xl font-bold text-blue-600 sm:text-2xl"
          >
            {{ formatMoney(report.overview.totalLeadValue) }}
          </p>

          <p class="mt-2 text-xs text-slate-400">
            معدل التحويل:
            {{ formatPercent(report.overview.conversionRate) }}
          </p>
        </div>
      </div>

      <!-- ================= AI ================= -->
      <section
        class="overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-violet-50 shadow-sm"
      >
        <div
          class="flex flex-col gap-4 border-b border-blue-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div class="flex items-center gap-2">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg text-white shadow-sm"
              >
                ✦
              </span>

              <div>
                <h2
                  class="text-lg font-bold text-slate-900"
                >
                  التحليل الذكي
                </h2>

                <p class="mt-1 text-xs text-slate-500">
                  تحليل آلي لبيانات التقرير باستخدام الذكاء الاصطناعي.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="generateAIAnalysis"
            :disabled="aiLoading"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span
              v-if="aiLoading"
              class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            ></span>

            <span v-else>✦</span>

            {{
              aiLoading
                ? "جاري تحليل التقرير..."
                : aiAnalysis
                  ? "إعادة تحليل التقرير"
                  : "تحليل التقرير بالذكاء الاصطناعي"
            }}
          </button>
        </div>

        <!-- AI Error -->
        <div
          v-if="aiError"
          class="mx-5 my-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:mx-6"
        >
          {{ aiError }}
        </div>

        <!-- AI Loading -->
        <div
          v-if="aiLoading"
          class="flex min-h-[220px] items-center justify-center p-6"
        >
          <div class="text-center">
            <div
              class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100"
            >
              <div
                class="h-5 w-5 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"
              ></div>
            </div>

            <p class="mt-4 text-sm font-semibold text-slate-700">
              الذكاء الاصطناعي يحلل التقرير...
            </p>

            <p class="mt-1 text-xs text-slate-400">
              قد يستغرق التحليل بضع ثوانٍ.
            </p>
          </div>
        </div>

        <!-- AI Empty -->
        <div
          v-else-if="!aiAnalysis"
          class="p-6 text-center sm:p-8"
        >
          <p class="text-sm font-medium text-slate-700">
            احصل على قراءة ذكية لأداء الفترة الحالية.
          </p>

          <p
            class="mx-auto mt-2 max-w-xl text-xs leading-6 text-slate-400"
          >
            سيحلل الذكاء الاصطناعي الحملات والعملاء المحتملين
            والموظفين، ثم يقترح إجراءات عملية مبنية على بيانات التقرير.
          </p>
        </div>

        <!-- AI Result -->
        <div
          v-else
          class="grid grid-cols-1 gap-4 p-5 sm:p-6 xl:grid-cols-3"
        >
          <!-- Summary -->
          <div
            class="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-3"
          >
            <div class="mb-3 flex items-center gap-2">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600"
              >
                ◈
              </span>

              <h3 class="font-bold text-slate-900">
                ملخص الأداء
              </h3>
            </div>

            <p
              class="text-sm leading-7 text-slate-600"
            >
              {{ aiAnalysis.summary }}
            </p>
          </div>

          <!-- Strengths -->
          <div
            class="rounded-xl border border-emerald-100 bg-white p-5"
          >
            <div class="mb-4 flex items-center gap-2">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"
              >
                ✓
              </span>

              <h3 class="font-bold text-slate-900">
                نقاط القوة
              </h3>
            </div>

            <div
              v-if="aiAnalysis.strengths?.length"
              class="space-y-3"
            >
              <div
                v-for="(
                  item, index
                ) in aiAnalysis.strengths"
                :key="`strength-${index}`"
                class="flex items-start gap-2 text-sm leading-6 text-slate-600"
              >
                <span
                  class="mt-1 text-emerald-500"
                >
                  ✓
                </span>

                <span>
                  {{ item }}
                </span>
              </div>
            </div>

            <p
              v-else
              class="text-sm text-slate-400"
            >
              لا توجد نقاط قوة محددة.
            </p>
          </div>

          <!-- Risks -->
          <div
            class="rounded-xl border border-amber-100 bg-white p-5"
          >
            <div class="mb-4 flex items-center gap-2">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600"
              >
                !
              </span>

              <h3 class="font-bold text-slate-900">
                المخاطر
              </h3>
            </div>

            <div
              v-if="aiAnalysis.risks?.length"
              class="space-y-3"
            >
              <div
                v-for="(
                  item, index
                ) in aiAnalysis.risks"
                :key="`risk-${index}`"
                class="flex items-start gap-2 text-sm leading-6 text-slate-600"
              >
                <span
                  class="mt-1 text-amber-500"
                >
                  !
                </span>

                <span>
                  {{ item }}
                </span>
              </div>
            </div>

            <p
              v-else
              class="text-sm text-slate-400"
            >
              لا توجد مخاطر محددة.
            </p>
          </div>

          <!-- Recommendations -->
          <div
            class="rounded-xl border border-violet-100 bg-white p-5"
          >
            <div class="mb-4 flex items-center gap-2">
              <span
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600"
              >
                ★
              </span>

              <h3 class="font-bold text-slate-900">
                التوصيات
              </h3>
            </div>

            <div
              v-if="
                aiAnalysis.recommendations?.length
              "
              class="space-y-3"
            >
              <div
                v-for="(
                  item, index
                ) in aiAnalysis.recommendations"
                :key="`recommendation-${index}`"
                class="flex items-start gap-2 text-sm leading-6 text-slate-600"
              >
                <span
                  class="mt-1 text-violet-500"
                >
                  •
                </span>

                <span>
                  {{ item }}
                </span>
              </div>
            </div>

            <p
              v-else
              class="text-sm text-slate-400"
            >
              لا توجد توصيات محددة.
            </p>
          </div>
        </div>
      </section>

      <!-- Campaign Performance -->
      <div
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div class="border-b border-slate-100 p-5">
          <h2 class="text-lg font-bold text-slate-900">
            أداء الحملات
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            مقارنة الميزانية والإنفاق وأهم مؤشرات الأداء.
          </p>
        </div>

        <div
          v-if="report.campaigns.length === 0"
          class="p-10 text-center text-sm text-slate-400"
        >
          لا توجد حملات ضمن الفترة المحددة.
        </div>

        <div
          v-else
          class="overflow-x-auto"
        >
          <table class="w-full min-w-[900px] text-right text-sm">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="p-4 font-semibold">الحملة</th>
                <th class="p-4 font-semibold">العميل</th>
                <th class="p-4 font-semibold">المنصة</th>
                <th class="p-4 font-semibold">الميزانية</th>
                <th class="p-4 font-semibold">الإنفاق</th>
                <th class="p-4 font-semibold">النقرات</th>
                <th class="p-4 font-semibold">التحويلات</th>
                <th class="p-4 font-semibold">الحالة</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="campaign in report.campaigns"
                :key="campaign.id"
                class="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td class="p-4 font-semibold text-slate-800">
                  {{ campaign.name }}
                </td>

                <td class="p-4 text-slate-500">
                  {{ campaign.client || "—" }}
                </td>

                <td class="p-4">
                  <span
                    class="rounded-lg bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                  >
                    {{ campaign.platform }}
                  </span>
                </td>

                <td class="p-4">
                  {{ formatMoney(campaign.budget) }}
                </td>

                <td class="p-4 font-semibold">
                  {{ formatMoney(campaign.spent) }}
                </td>

                <td class="p-4">
                  {{ formatNumber(campaign.clicks) }}
                </td>

                <td class="p-4">
                  {{ formatNumber(campaign.conversions) }}
                </td>

                <td class="p-4">
                  <span
                    class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                  >
                    {{ campaign.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Platforms + Leads -->
      <div
        class="grid grid-cols-1 gap-6 xl:grid-cols-2"
      >
        <!-- Platforms -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div class="mb-5">
            <h2 class="text-lg font-bold text-slate-900">
              أداء المنصات
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              توزيع الميزانية والإنفاق حسب المنصة.
            </p>
          </div>

          <div
            v-if="report.platforms.length === 0"
            class="py-8 text-center text-sm text-slate-400"
          >
            لا توجد بيانات منصات.
          </div>

          <div
            v-else
            class="space-y-4"
          >
            <div
              v-for="platform in report.platforms"
              :key="platform.platform"
              class="rounded-xl border border-slate-100 p-4"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="font-semibold text-slate-800">
                  {{ platform.platform }}
                </p>

                <p class="text-sm font-bold text-slate-900">
                  {{ formatMoney(platform.spent) }}
                </p>
              </div>

              <div
                class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
              >
                <div
                  class="h-full rounded-full bg-blue-600 transition-all"
                  :style="{
                    width: `${Math.min(
                      platform.budget > 0
                        ? (platform.spent /
                            platform.budget) *
                          100
                        : 0,
                      100,
                    )}%`,
                  }"
                ></div>
              </div>

              <div
                class="mt-2 flex items-center justify-between text-xs text-slate-400"
              >
                <span>
                  الميزانية:
                  {{ formatMoney(platform.budget) }}
                </span>

                <span>
                  {{ formatNumber(platform.conversions) }}
                  تحويل
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Lead Status -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div class="mb-5">
            <h2 class="text-lg font-bold text-slate-900">
              حالة العملاء المحتملين
            </h2>

            <p class="mt-1 text-sm text-slate-500">
              توزيع العملاء المحتملين حسب مرحلة البيع.
            </p>
          </div>

          <div
            class="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs text-slate-500">جديد</p>

              <p class="mt-2 text-xl font-bold text-slate-900">
                {{ formatNumber(report.leads.new) }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-4">
              <p class="text-xs text-slate-500">
                تم التواصل
              </p>

              <p class="mt-2 text-xl font-bold text-slate-900">
                {{ formatNumber(report.leads.contacted) }}
              </p>
            </div>

            <div class="rounded-xl bg-blue-50 p-4">
              <p class="text-xs text-blue-600">مؤهل</p>

              <p class="mt-2 text-xl font-bold text-blue-700">
                {{ formatNumber(report.leads.qualified) }}
              </p>
            </div>

            <div class="rounded-xl bg-red-50 p-4">
              <p class="text-xs text-red-600">
                غير مؤهل
              </p>

              <p class="mt-2 text-xl font-bold text-red-700">
                {{ formatNumber(report.leads.unqualified) }}
              </p>
            </div>
          </div>

          <div class="mt-5 rounded-xl bg-slate-50 p-4">
            <div
              class="flex items-center justify-between gap-3 text-sm"
            >
              <span class="text-slate-500">
                معدل التحويل إلى مؤهل
              </span>

              <span class="font-bold text-slate-900">
                {{ formatPercent(report.overview.conversionRate) }}
              </span>
            </div>

            <div
              class="mt-3 h-2 overflow-hidden rounded-full bg-slate-200"
            >
              <div
                class="h-full rounded-full bg-blue-600 transition-all"
                :style="{
                  width: `${Math.min(
                    report.overview.conversionRate,
                    100,
                  )}%`,
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Employees -->
      <div
        class="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div class="border-b border-slate-100 p-5">
          <h2 class="text-lg font-bold text-slate-900">
            أفضل الموظفين
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            أعلى الموظفين حسب قيمة العملاء المحتملين.
          </p>
        </div>

        <div
          v-if="report.employees.length === 0"
          class="p-10 text-center text-sm text-slate-400"
        >
          لا توجد بيانات للموظفين ضمن الفترة المحددة.
        </div>

        <div
          v-else
          class="divide-y divide-slate-100"
        >
          <div
            v-for="(employee, index) in report.employees"
            :key="employee.name"
            class="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center gap-3">
              <span
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600"
              >
                {{ index + 1 }}
              </span>

              <div>
                <p class="font-semibold text-slate-800">
                  {{ employee.name }}
                </p>

                <p class="mt-1 text-xs text-slate-400">
                  {{ formatNumber(employee.leadsCount) }}
                  عملاء محتملين
                  ·
                  {{ formatNumber(employee.qualifiedLeads) }}
                  مؤهل
                </p>
              </div>
            </div>

            <p class="font-bold text-slate-900">
              {{ formatMoney(employee.totalValue) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-sm text-slate-500">
            مرات الظهور
          </p>

          <p class="mt-2 text-xl font-bold text-slate-900">
            {{ formatNumber(report.overview.totalImpressions) }}
          </p>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-sm text-slate-500">
            النقرات
          </p>

          <p class="mt-2 text-xl font-bold text-slate-900">
            {{ formatNumber(report.overview.totalClicks) }}
          </p>

          <p class="mt-1 text-xs text-slate-400">
            CTR:
            {{ formatPercent(report.overview.clickThroughRate) }}
          </p>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-sm text-slate-500">
            التحويلات
          </p>

          <p class="mt-2 text-xl font-bold text-slate-900">
            {{ formatNumber(report.overview.totalConversions) }}
          </p>

          <p class="mt-1 text-xs text-slate-400">
            معدل التحويل:
            {{
              formatPercent(
                report.overview.campaignConversionRate,
              )
            }}
          </p>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p class="text-sm text-slate-500">
            الميزانية المتبقية
          </p>

          <p
            class="mt-2 text-xl font-bold"
            :class="
              report.overview.remainingBudget >= 0
                ? 'text-emerald-600'
                : 'text-red-600'
            "
          >
            {{
              formatMoney(
                report.overview.remainingBudget,
              )
            }}
          </p>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped>
@media print {
  .print\:hidden {
    display: none !important;
  }

  body {
    background: white !important;
  }
}
</style>