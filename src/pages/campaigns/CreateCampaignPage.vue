<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold">
        إنشاء حملة جديدة
      </h1>

      <p class="mt-2 text-slate-500">
        أدخل بيانات الحملة الإعلانية.
      </p>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <form class="grid grid-cols-2 gap-6">

        <div>
          <label class="mb-2 block font-medium">
            اسم الحملة
          </label>

          <input
            type="text"
            placeholder="أدخل اسم الحملة"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium">
            العميل
          </label>

          <select
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option>اختر العميل</option>
            <option>شركة الريادة العقارية</option>
            <option>عيادات النخبة</option>
            <option>متجر الأناقة</option>
            <option>شركة السفر الذكي</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block font-medium">
            المنصة الإعلانية
          </label>

          <select
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option>Google Ads</option>
            <option>Meta Ads</option>
            <option>TikTok Ads</option>
            <option>Snapchat Ads</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block font-medium">
            هدف الحملة
          </label>

          <select
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option>زيادة المبيعات</option>
            <option>جمع العملاء المحتملين</option>
            <option>زيارات الموقع</option>
            <option>رفع الوعي بالعلامة التجارية</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block font-medium">
            الميزانية
          </label>

          <input
            type="number"
            placeholder="10000"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium">
            العملة
          </label>

          <select
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option>ريال سعودي</option>
            <option>دولار أمريكي</option>
          </select>
        </div>

        <div>
          <label class="mb-2 block font-medium">
            تاريخ البداية
          </label>

          <input
            type="date"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium">
            تاريخ النهاية
          </label>

          <input
            type="date"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <div class="col-span-2">
          <label class="mb-2 block font-medium">
            وصف الحملة
          </label>

          <textarea
            rows="5"
            placeholder="اكتب وصفًا مختصرًا للحملة..."
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          ></textarea>
        </div>

        <div class="col-span-2 flex justify-end gap-4">

          <button
            type="button"
            class="rounded-xl border border-slate-300 px-6 py-3"
          >
            إلغاء
          </button>

          <button
            type="submit"
            class="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            حفظ الحملة
          </button>

        </div>

      </form>

    </div>
  </div>
</template>