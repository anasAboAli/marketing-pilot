<script setup>
const campaign = {
  name: "حملة الصيف",
  client: "شركة الريادة العقارية",
  platform: "Google Ads",
  objective: "زيادة المبيعات",
  budget: "15,000 ر.س",
  spent: "8,250 ر.س",
  impressions: "245,800",
  clicks: "12,460",
  ctr: "5.07%",
  conversions: "312",
  roas: "4.8x",
  startDate: "01/07/2026",
  endDate: "31/07/2026",
  status: "نشطة",
};
</script>

<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">
          {{ campaign.name }}
        </h1>

        <p class="mt-2 text-slate-500">
          تفاصيل الحملة الإعلانية
        </p>
      </div>

      <button
        class="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        تعديل الحملة
      </button>
    </div>

    <div class="grid grid-cols-3 gap-6">

      <div class="col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 class="mb-6 text-xl font-semibold">
          معلومات الحملة
        </h2>

        <div class="grid grid-cols-2 gap-6">

          <div>
            <p class="text-sm text-slate-500">العميل</p>
            <h3 class="mt-1 font-semibold">{{ campaign.client }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">المنصة</p>
            <h3 class="mt-1 font-semibold">{{ campaign.platform }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">الهدف</p>
            <h3 class="mt-1 font-semibold">{{ campaign.objective }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">الحالة</p>

            <span class="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              {{ campaign.status }}
            </span>

          </div>

          <div>
            <p class="text-sm text-slate-500">تاريخ البداية</p>
            <h3 class="mt-1 font-semibold">{{ campaign.startDate }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">تاريخ النهاية</p>
            <h3 class="mt-1 font-semibold">{{ campaign.endDate }}</h3>
          </div>

        </div>

      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 class="mb-6 text-xl font-semibold">
          الميزانية
        </h2>

        <div class="space-y-6">

          <div>
            <p class="text-sm text-slate-500">الميزانية</p>
            <h3 class="mt-2 text-2xl font-bold">{{ campaign.budget }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">المنصرف</p>
            <h3 class="mt-2 text-2xl font-bold">{{ campaign.spent }}</h3>
          </div>

        </div>

      </div>

    </div>

    <div class="mt-8 grid grid-cols-5 gap-6">

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">مرات الظهور</p>
        <h3 class="mt-3 text-2xl font-bold">{{ campaign.impressions }}</h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">النقرات</p>
        <h3 class="mt-3 text-2xl font-bold">{{ campaign.clicks }}</h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">CTR</p>
        <h3 class="mt-3 text-2xl font-bold">{{ campaign.ctr }}</h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">التحويلات</p>
        <h3 class="mt-3 text-2xl font-bold">{{ campaign.conversions }}</h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">ROAS</p>
        <h3 class="mt-3 text-2xl font-bold">{{ campaign.roas }}</h3>
      </div>

    </div>
  </div>
</template>