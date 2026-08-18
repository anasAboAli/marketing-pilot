<script setup>
const clients = [
  {
    name: "شركة الريادة العقارية",
    campaigns: 8,
    revenue: "18,500 ر.س",
    status: "نشط",
  },
  {
    name: "عيادات النخبة",
    campaigns: 5,
    revenue: "12,300 ر.س",
    status: "نشط",
  },
  {
    name: "متجر الأناقة",
    campaigns: 4,
    revenue: "9,800 ر.س",
    status: "نشط",
  },
  {
    name: "شركة السفر الذكي",
    campaigns: 3,
    revenue: "7,600 ر.س",
    status: "متوقف",
  },
];
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div class="border-b border-slate-200 p-6">
      <h3 class="text-lg font-semibold">
        أفضل العملاء
      </h3>

      <p class="mt-1 text-sm text-slate-500">
        العملاء الأعلى أداءً
      </p>
    </div>

    <table class="w-full">
      <thead class="bg-slate-50">
        <tr>
          <th class="p-4 text-right">العميل</th>
          <th class="text-right">الحملات</th>
          <th class="text-right">الإيرادات</th>
          <th class="text-right">الحالة</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="client in clients"
          :key="client.name"
          class="border-t border-slate-100 hover:bg-slate-50"
        >
          <td class="p-4 font-medium">
            {{ client.name }}
          </td>

          <td>{{ client.campaigns }}</td>

          <td>{{ client.revenue }}</td>

          <td>
            <span
              :class="[
                'rounded-full px-3 py-1 text-xs font-semibold',
                client.status === 'نشط'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700',
              ]"
            >
              {{ client.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>