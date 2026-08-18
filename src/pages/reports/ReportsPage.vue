<script setup>
import { ref } from "vue";

const selectedPeriod = ref("هذا الشهر");
const reports = [
  { name: "تقرير أداء الحملات", type: "أداء الحملات", date: "01/08/2026", status: "جاهز" },
  { name: "تقرير العملاء والمبيعات", type: "CRM", date: "05/08/2026", status: "جاهز" },
  { name: "ملخص الفريق والمهام", type: "الفريق", date: "07/08/2026", status: "جاهز" },
];

function exportCsv() {
  const rows = [["اسم التقرير", "النوع", "التاريخ", "الحالة"], ...reports.map((report) => Object.values(report))];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "marketingpilot-reports.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function printReport() {
  window.print();
}
</script>

<template>
  <section class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-semibold text-blue-600">مركز التقارير</p>
        <h1 class="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">التقارير والتحليلات</h1>
        <p class="mt-2 text-slate-500">أنشئ تقارير واضحة وشاركها مع فريقك أو عملائك.</p>
      </div>
      <div class="flex flex-wrap gap-2 print:hidden">
        <select v-model="selectedPeriod" class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
          <option>هذا الشهر</option><option>الربع الحالي</option><option>آخر 12 شهرًا</option>
        </select>
        <button class="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" @click="printReport">طباعة PDF</button>
        <button class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700" @click="exportCsv">تصدير Excel</button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div v-for="stat in [{label:'إجمالي الإنفاق',value:'84,250 ر.س',change:'+18%'},{label:'العملاء المحتملون',value:'1,284',change:'+24%'},{label:'نسبة التحويل',value:'8.6%',change:'+3.2%'}]" :key="stat.label" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">{{ stat.label }}</p><p class="mt-2 text-2xl font-bold text-slate-900">{{ stat.value }}</p><span class="mt-2 inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">{{ stat.change }} من الفترة السابقة</span>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-slate-100 p-5"><h2 class="font-bold text-slate-900">التقارير المحفوظة</h2><span class="text-sm text-slate-500">{{ selectedPeriod }}</span></div>
      <div class="overflow-x-auto"><table class="w-full min-w-[620px] text-right text-sm"><thead class="bg-slate-50 text-slate-500"><tr><th class="p-4 font-semibold">اسم التقرير</th><th class="p-4 font-semibold">النوع</th><th class="p-4 font-semibold">التاريخ</th><th class="p-4 font-semibold">الحالة</th><th class="p-4"></th></tr></thead><tbody><tr v-for="report in reports" :key="report.name" class="border-t border-slate-100"><td class="p-4 font-semibold text-slate-800">{{ report.name }}</td><td class="p-4 text-slate-500">{{ report.type }}</td><td class="p-4 text-slate-500">{{ report.date }}</td><td class="p-4"><span class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{{ report.status }}</span></td><td class="p-4"><button class="text-sm font-semibold text-blue-600 hover:text-blue-800" @click="printReport">عرض التقرير</button></td></tr></tbody></table></div>
    </div>
  </section>
</template>
