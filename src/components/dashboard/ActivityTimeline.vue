<script setup>
const activities = [
  "تم إنشاء حملة جديدة",

  "تم إضافة عميل",

  "تم إنشاء تقرير",

  "تم تعديل الميزانية",

  "تم قبول العميل",

  "تم إرسال الفاتورة",
];
</script>

<template>
  <div class="rounded-2xl border bg-white p-6 shadow-sm">
    <h2 class="mb-8 text-xl font-bold">آخر العمليات</h2>

    <div v-for="activity in activities" :key="activity" class="mb-6 flex gap-4">
      <div class="mt-2 h-3 w-3 rounded-full bg-blue-600"></div>

      <div>
        {{ activity }}
      </div>
    </div>
  </div>
</template>
