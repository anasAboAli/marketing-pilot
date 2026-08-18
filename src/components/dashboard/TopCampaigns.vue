<script setup>
const campaigns = [
  {
    name: "حملة الصيف",
    client: "شركة الريادة العقارية",
    platform: "Google Ads",
    budget: "15,000 ر.س",
    status: "نشطة",
    roas: "4.8x",
  },
  {
    name: "حملة العودة للمدارس",
    client: "متجر الأناقة",
    platform: "Meta Ads",
    budget: "9,500 ر.س",
    status: "نشطة",
    roas: "3.6x",
  },
  {
    name: "حملة الخدمات الطبية",
    client: "عيادات النخبة",
    platform: "Google Ads",
    budget: "12,000 ر.س",
    status: "مكتملة",
    roas: "5.2x",
  },
  {
    name: "حملة السفر الصيفية",
    client: "شركة السفر الذكي",
    platform: "TikTok Ads",
    budget: "7,000 ر.س",
    status: "متوقفة",
    roas: "2.4x",
  },
];
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm">

    <div class="border-b border-slate-200 p-6">

      <h3 class="text-lg font-semibold">

        أفضل الحملات

      </h3>

      <p class="mt-1 text-sm text-slate-500">

        ملخص أداء أهم الحملات الإعلانية

      </p>

    </div>

    <table class="w-full">

      <thead class="bg-slate-50">

        <tr>

          <th class="p-4 text-right">الحملة</th>

          <th class="text-right">العميل</th>

          <th class="text-right">المنصة</th>

          <th class="text-right">الميزانية</th>

          <th class="text-right">الحالة</th>

          <th class="text-right">ROAS</th>

        </tr>

      </thead>

      <tbody>

        <tr
          v-for="campaign in campaigns"
          :key="campaign.name"
          class="border-t border-slate-100 hover:bg-slate-50"
        >
          <td class="p-4 font-medium">

            {{ campaign.name }}

          </td>

          <td>{{ campaign.client }}</td>

          <td>{{ campaign.platform }}</td>

          <td>{{ campaign.budget }}</td>

          <td>

            <span
              class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
            >
              {{ campaign.status }}
            </span>

          </td>

          <td class="font-semibold">

            {{ campaign.roas }}

          </td>

        </tr>

      </tbody>

    </table>

  </div>
</template>