<script setup>
const lead = {
  id: 1,
  name: "محمد أحمد",
  company: "شركة الريادة العقارية",
  phone: "0501234567",
  email: "m.ahmed@gmail.com",
  source: "Google Ads",
  campaign: "حملة الصيف",
  value: "12,000 ر.س",
  status: "مؤهل",
  assignedTo: "أحمد محمد",
  createdAt: "15/07/2026",
  notes:
    "العميل مهتم بالخدمة وطلب عرض سعر، وتم تحديد موعد اجتماع الأسبوع القادم.",
};
</script>

<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">
          {{ lead.name }}
        </h1>

        <p class="mt-2 text-slate-500">
          تفاصيل العميل المحتمل
        </p>
      </div>

      <button
        class="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        تعديل البيانات
      </button>
    </div>

    <div class="grid grid-cols-3 gap-6">

      <div class="col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 class="mb-6 text-xl font-semibold">
          معلومات العميل المحتمل
        </h2>

        <div class="grid grid-cols-2 gap-6">

          <div>
            <p class="text-sm text-slate-500">الاسم</p>
            <h3 class="mt-1 font-semibold">{{ lead.name }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">الشركة</p>
            <h3 class="mt-1 font-semibold">{{ lead.company }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">رقم الهاتف</p>
            <h3 class="mt-1 font-semibold">{{ lead.phone }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">البريد الإلكتروني</p>
            <h3 class="mt-1 font-semibold">{{ lead.email }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">مصدر العميل</p>
            <h3 class="mt-1 font-semibold">{{ lead.source }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">الحملة</p>
            <h3 class="mt-1 font-semibold">{{ lead.campaign }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">القيمة المتوقعة</p>
            <h3 class="mt-1 font-semibold">{{ lead.value }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">المسؤول</p>
            <h3 class="mt-1 font-semibold">{{ lead.assignedTo }}</h3>
          </div>

        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 class="mb-6 text-xl font-semibold">
          حالة العميل
        </h2>

        <div class="space-y-6">

          <div>
            <p class="text-sm text-slate-500">الحالة الحالية</p>

            <span class="mt-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
              {{ lead.status }}
            </span>
          </div>

          <div>
            <p class="text-sm text-slate-500">تاريخ الإضافة</p>
            <h3 class="mt-2 text-lg font-semibold">
              {{ lead.createdAt }}
            </h3>
          </div>

        </div>

      </div>

    </div>

    <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 class="mb-4 text-xl font-semibold">
        ملاحظات
      </h2>

      <p class="leading-8 text-slate-600">
        {{ lead.notes }}
      </p>

    </div>
  </div>
</template>