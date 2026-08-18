<script setup>
const client = {
  name: "شركة الريادة العقارية",
  industry: "العقارات",
  phone: "0501234567",
  email: "info@riyadah.com",
  manager: "أحمد محمد",
  campaigns: 8,
  revenue: "18,500 ر.س",
  status: "نشط",
  joinedAt: "12/01/2026",
};
</script>

<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">
          {{ client.name }}
        </h1>

        <p class="mt-2 text-slate-500">
          تفاصيل العميل
        </p>
      </div>

      <button
        class="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
      >
        تعديل العميل
      </button>
    </div>

    <div class="grid grid-cols-3 gap-6">

      <div class="col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 class="mb-6 text-xl font-semibold">
          معلومات العميل
        </h2>

        <div class="grid grid-cols-2 gap-6">

          <div>
            <p class="text-sm text-slate-500">اسم العميل</p>
            <h3 class="mt-1 font-semibold">{{ client.name }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">النشاط</p>
            <h3 class="mt-1 font-semibold">{{ client.industry }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">رقم الهاتف</p>
            <h3 class="mt-1 font-semibold">{{ client.phone }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">البريد الإلكتروني</p>
            <h3 class="mt-1 font-semibold">{{ client.email }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">مدير الحساب</p>
            <h3 class="mt-1 font-semibold">{{ client.manager }}</h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">تاريخ الانضمام</p>
            <h3 class="mt-1 font-semibold">{{ client.joinedAt }}</h3>
          </div>

        </div>

      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 class="mb-6 text-xl font-semibold">
          ملخص
        </h2>

        <div class="space-y-6">

          <div>
            <p class="text-sm text-slate-500">عدد الحملات</p>
            <h3 class="mt-2 text-2xl font-bold">
              {{ client.campaigns }}
            </h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">إجمالي الإيرادات</p>
            <h3 class="mt-2 text-2xl font-bold">
              {{ client.revenue }}
            </h3>
          </div>

          <div>
            <p class="text-sm text-slate-500">الحالة</p>

            <span class="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              {{ client.status }}
            </span>

          </div>

        </div>

      </div>

    </div>

    <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 class="mb-6 text-xl font-semibold">
        الحملات التابعة للعميل
      </h2>

      <table class="w-full">

        <thead class="bg-slate-50">

          <tr>

            <th class="p-4 text-right">الحملة</th>

            <th class="text-right">المنصة</th>

            <th class="text-right">الميزانية</th>

            <th class="text-right">الحالة</th>

          </tr>

        </thead>

        <tbody>

          <tr class="border-t border-slate-100">

            <td class="p-4">حملة الصيف</td>

            <td>Google Ads</td>

            <td>15,000 ر.س</td>

            <td>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                نشطة
              </span>
            </td>

          </tr>

          <tr class="border-t border-slate-100">

            <td class="p-4">حملة العودة للمدارس</td>

            <td>Meta Ads</td>

            <td>9,500 ر.س</td>

            <td>
              <span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                مكتملة
              </span>
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>
</template>