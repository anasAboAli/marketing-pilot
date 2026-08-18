<script setup>
const campaigns = [
  {
    id: 1,
    name: "حملة الصيف",
    client: "شركة الريادة العقارية",
    platform: "Google Ads",
    budget: "15,000 ر.س",
    spent: "8,250 ر.س",
    status: "نشطة",
  },
  {
    id: 2,
    name: "حملة العودة للمدارس",
    client: "متجر الأناقة",
    platform: "Meta Ads",
    budget: "9,500 ر.س",
    spent: "6,700 ر.س",
    status: "نشطة",
  },
  {
    id: 3,
    name: "حملة الخدمات الطبية",
    client: "عيادات النخبة",
    platform: "Google Ads",
    budget: "12,000 ر.س",
    spent: "12,000 ر.س",
    status: "مكتملة",
  },
  {
    id: 4,
    name: "حملة السفر",
    client: "شركة السفر الذكي",
    platform: "TikTok Ads",
    budget: "7,000 ر.س",
    spent: "3,500 ر.س",
    status: "متوقفة",
  },
];
</script>

<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">
          الحملات الإعلانية
        </h1>

        <p class="mt-2 text-slate-500">
          إدارة جميع الحملات الإعلانية
        </p>
      </div>

      <RouterLink
        to="/campaigns/create"
        class="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
        >
        + إنشاء حملة
      </RouterLink>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <table class="w-full">

        <thead class="bg-slate-50">

          <tr>

            <th class="p-5 text-right">اسم الحملة</th>

            <th class="text-right">العميل</th>

            <th class="text-right">المنصة</th>

            <th class="text-right">الميزانية</th>

            <th class="text-right">المنصرف</th>

            <th class="text-right">الحالة</th>

            <th class="text-center">الإجراءات</th>

          </tr>

        </thead>

        <tbody>

          <tr
            v-for="campaign in campaigns"
            :key="campaign.id"
            class="border-t border-slate-100 hover:bg-slate-50"
          >
            <td class="p-5 font-medium">
              {{ campaign.name }}
            </td>

            <td>{{ campaign.client }}</td>

            <td>{{ campaign.platform }}</td>

            <td>{{ campaign.budget }}</td>

            <td>{{ campaign.spent }}</td>

            <td>
              <span
                :class="[
                  'rounded-full px-3 py-1 text-xs font-semibold',
                  campaign.status === 'نشطة'
                    ? 'bg-green-100 text-green-700'
                    : campaign.status === 'مكتملة'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                {{ campaign.status }}
              </span>
            </td>

            <td class="text-center">

              <RouterLink
                :to="`/campaigns/${campaign.id}`"
                class="rounded-lg bg-slate-100 px-3 py-2 text-sm transition hover:bg-slate-200"
                >
                عرض
               </RouterLink>

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  </div>
</template>