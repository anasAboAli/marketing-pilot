<script setup>
import { computed, ref } from "vue";
import BaseBadge from "@/components/base/BaseBadge.vue";
import BaseCard from "@/components/base/BaseCard.vue";
import BasePageHeader from "@/components/base/BasePageHeader.vue";
import BaseInput from "@/components/base/BaseInput.vue";

const search = ref("");
const permissions = ref([
  { id: "campaign.view", name: "عرض الحملات", module: "الحملات", description: "الوصول إلى قائمة الحملات وتفاصيلها." },
  { id: "campaign.create", name: "إنشاء حملة", module: "الحملات", description: "إنشاء حملات جديدة داخل مساحة العمل." },
  { id: "clients.view", name: "عرض العملاء", module: "CRM", description: "عرض ملفات العملاء وسجل التواصل." },
  { id: "invoices.manage", name: "إدارة الفواتير", module: "المالية", description: "إنشاء وتعديل وإرسال الفواتير." },
  { id: "reports.export", name: "تصدير التقارير", module: "التقارير", description: "تصدير التقارير بصيغ PDF وExcel." },
]);

const filteredPermissions = computed(() => {
  const query = search.value.trim();
  if (!query) return permissions.value;
  return permissions.value.filter((permission) => [permission.name, permission.module, permission.description].some((value) => value.includes(query)));
});
</script>

<template>
  <div class="space-y-6">
    <BasePageHeader title="الصلاحيات" description="إدارة صلاحيات الأدوار في مساحة العمل." />
    <BaseCard>
      <template #header>
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="font-semibold text-slate-900">قائمة الصلاحيات</h2>
            <p class="mt-1 text-sm text-slate-500">تُطبّق الصلاحيات على الواجهة وواجهة البرمجة عند ربط الخادم.</p>
          </div>
          <BaseInput v-model="search" type="search" class="w-full sm:w-64" placeholder="ابحث عن صلاحية" aria-label="البحث في الصلاحيات" />
        </div>
      </template>
      <div class="divide-y divide-slate-100">
        <div v-for="permission in filteredPermissions" :key="permission.id" class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="font-medium text-slate-900">{{ permission.name }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ permission.description }}</p>
          </div>
          <BaseBadge>{{ permission.module }}</BaseBadge>
        </div>
        <p v-if="!filteredPermissions.length" class="py-10 text-center text-sm text-slate-500">لا توجد صلاحيات مطابقة للبحث.</p>
      </div>
    </BaseCard>
  </div>
</template>
