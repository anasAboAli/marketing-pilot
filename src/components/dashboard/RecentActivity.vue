<script setup>
const activities = [
  {
    title: "تم إنشاء حملة إعلانية جديدة",
    description: "حملة الصيف - شركة الريادة العقارية",
    time: "منذ 5 دقائق",
  },
  {
    title: "تم إضافة عميل جديد",
    description: "شركة التقنية الحديثة",
    time: "منذ 20 دقيقة",
  },
  {
    title: "تم إيقاف حملة مؤقتًا",
    description: "حملة متجر الأناقة",
    time: "منذ ساعة",
  },
  {
    title: "تم تصدير التقرير الشهري",
    description: "تقرير شهر يوليو",
    time: "أمس",
  },
];
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-slate-900">
        آخر النشاطات
      </h3>

      <p class="text-sm text-slate-500">
        أحدث العمليات داخل النظام
      </p>
    </div>

    <div
      v-for="activity in activities"
      :key="activity.title"
      class="flex items-start gap-4 border-b border-slate-100 py-4 last:border-b-0"
    >
      <div class="mt-1 h-3 w-3 rounded-full bg-blue-600"></div>

      <div class="flex-1">
        <h4 class="font-medium text-slate-800">
          {{ activity.title }}
        </h4>

        <p class="mt-1 text-sm text-slate-500">
          {{ activity.description }}
        </p>
      </div>

      <span class="text-xs text-slate-400 whitespace-nowrap">
        {{ activity.time }}
      </span>
    </div>
  </div>
</template>