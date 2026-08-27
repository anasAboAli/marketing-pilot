<script setup>
import { computed, onMounted, ref } from "vue";
import leadsService from "@/services/leads.service";

const leads = ref([]);
const showForm = ref(false);

const loading = ref(true);
const creating = ref(false);

const error = ref("");
const success = ref("");

const currentPage = ref(1);
const itemsPerPage = 10;

const form = ref({
  name: "",
  company: "",
  phone: "",
  email: "",
  source: "Google Ads",
  campaign: "",
  assignedTo: "",
  value: 0,
  status: "جديد",
  notes: "",
});

const errors = ref({
  name: "",
  company: "",
  phone: "",
  value: "",
});

const totalPages = computed(() => Math.ceil(leads.value.length / itemsPerPage));

const paginatedLeads = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;

  return leads.value.slice(start, start + itemsPerPage);
});

const showingFrom = computed(() => {
  if (leads.value.length === 0) return 0;

  return (currentPage.value - 1) * itemsPerPage + 1;
});

const showingTo = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, leads.value.length);
});

async function load() {
  try {
    loading.value = true;
    error.value = "";

    leads.value = await leadsService.getAll();

    currentPage.value = 1;
  } catch (e) {
    error.value =
      e.response?.data?.error || e.message || "تعذر تحميل العملاء المحتملين";
  } finally {
    loading.value = false;
  }
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) {
    return;
  }

  currentPage.value = page;
}

function resetForm() {
  form.value = {
    name: "",
    company: "",
    phone: "",
    email: "",
    source: "Google Ads",
    campaign: "",
    assignedTo: "",
    value: 0,
    status: "جديد",
    notes: "",
  };

  errors.value = {
    name: "",
    company: "",
    phone: "",
    value: "",
  };
}

function validateForm() {
  errors.value = {
    name: "",
    company: "",
    phone: "",
    value: "",
  };

  if (!form.value.name.trim()) {
    errors.value.name = "اسم العميل مطلوب";
  }

  if (!form.value.company.trim()) {
    errors.value.company = "اسم الشركة مطلوب";
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = "رقم الهاتف مطلوب";
  } else if (!/^[0-9+\-\s]+$/.test(form.value.phone)) {
    errors.value.phone = "رقم الهاتف غير صالح";
  }

  if (Number(form.value.value) < 0) {
    errors.value.value = "القيمة لا يمكن أن تكون سالبة";
  }

  return !Object.values(errors.value).some((value) => value);
}

async function create() {
  if (!validateForm()) {
    return;
  }

  try {
    creating.value = true;
    error.value = "";
    success.value = "";

    const lead = await leadsService.create({
      ...form.value,
      value: Number(form.value.value),
    });

    leads.value.unshift(lead);

    resetForm();

    showForm.value = false;

    // العودة للصفحة الأولى حتى يظهر الـ Lead الجديد
    currentPage.value = 1;

    success.value = "تم إضافة العميل المحتمل بنجاح";

    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (e) {
    error.value =
      e.response?.data?.error || e.message || "تعذر إضافة العميل المحتمل";
  } finally {
    creating.value = false;
  }
}

onMounted(load);
</script>

<template>
  <section class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p class="text-sm font-semibold text-blue-600">إدارة المبيعات</p>

        <h1 class="mt-1 text-2xl font-bold sm:text-3xl">العملاء المحتملون</h1>

        <p class="mt-2 text-slate-500">تابع الفرص الجديدة وحوّلها إلى عملاء.</p>
      </div>

      <button
        type="button"
        class="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
        @click="showForm = !showForm"
      >
        {{ showForm ? "إلغاء الإضافة" : "+ إضافة عميل محتمل" }}
      </button>
    </div>

    <!-- Success -->
    <div
      v-if="success"
      class="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700"
    >
      {{ success }}
    </div>

    <!-- Error -->
    <div v-if="error" class="rounded-xl bg-red-50 p-4 text-red-700">
      {{ error }}
    </div>

    <!-- Add Form -->
    <form
      v-if="showForm"
      class="grid grid-cols-1 gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:grid-cols-2 lg:grid-cols-4"
      @submit.prevent="create"
    >
      <!-- Name -->
      <div>
        <label class="mb-2 block text-sm font-medium">
          اسم العميل المحتمل
        </label>

        <input
          v-model="form.name"
          type="text"
          placeholder="اسم العميل"
          class="w-full rounded-xl border-2 bg-white px-4 py-3 outline-none"
          :class="
            errors.name
              ? 'border-red-500'
              : 'border-slate-200 focus:border-blue-500'
          "
        />

        <p v-if="errors.name" class="mt-1 text-xs text-red-600">
          {{ errors.name }}
        </p>
      </div>

      <!-- Company -->
      <div>
        <label class="mb-2 block text-sm font-medium"> الشركة </label>

        <input
          v-model="form.company"
          type="text"
          placeholder="الشركة"
          class="w-full rounded-xl border-2 bg-white px-4 py-3 outline-none"
          :class="
            errors.company
              ? 'border-red-500'
              : 'border-slate-200 focus:border-blue-500'
          "
        />

        <p v-if="errors.company" class="mt-1 text-xs text-red-600">
          {{ errors.company }}
        </p>
      </div>

      <!-- Phone -->
      <div>
        <label class="mb-2 block text-sm font-medium"> رقم الهاتف </label>

        <input
          v-model="form.phone"
          type="tel"
          inputmode="tel"
          dir="ltr"
          placeholder="0501234567"
          class="w-full rounded-xl border-2 bg-white px-4 py-3 text-right outline-none"
          :class="
            errors.phone
              ? 'border-red-500'
              : 'border-slate-200 focus:border-blue-500'
          "
        />

        <p v-if="errors.phone" class="mt-1 text-xs text-red-600">
          {{ errors.phone }}
        </p>
      </div>

      <!-- Value -->
      <div>
        <label class="mb-2 block text-sm font-medium"> القيمة المتوقعة </label>

        <input
          v-model.number="form.value"
          type="number"
          min="0"
          step="0.01"
          placeholder="12000"
          class="w-full rounded-xl border-2 bg-white px-4 py-3 outline-none"
          :class="
            errors.value
              ? 'border-red-500'
              : 'border-slate-200 focus:border-blue-500'
          "
        />

        <p v-if="errors.value" class="mt-1 text-xs text-red-600">
          {{ errors.value }}
        </p>
      </div>

      <!-- Email -->
      <div>
        <label class="mb-2 block text-sm font-medium">
          البريد الإلكتروني
        </label>

        <input
          v-model="form.email"
          type="email"
          placeholder="example@email.com"
          class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <!-- Source -->
      <div>
        <label class="mb-2 block text-sm font-medium"> مصدر العميل </label>

        <select
          v-model="form.source"
          class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="Google Ads">Google Ads</option>
          <option value="Meta Ads">Meta Ads</option>
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
          <option value="Website">Website</option>
          <option value="Other">أخرى</option>
        </select>
      </div>

      <!-- Campaign -->
      <div>
        <label class="mb-2 block text-sm font-medium"> الحملة </label>

        <input
          v-model="form.campaign"
          type="text"
          placeholder="اسم الحملة"
          class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <!-- Assigned -->
      <div>
        <label class="mb-2 block text-sm font-medium"> المسؤول </label>

        <input
          v-model="form.assignedTo"
          type="text"
          placeholder="اسم المسؤول"
          class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <!-- Notes -->
      <div class="sm:col-span-2 lg:col-span-4">
        <label class="mb-2 block text-sm font-medium"> الملاحظات </label>

        <textarea
          v-model="form.notes"
          rows="3"
          placeholder="ملاحظات..."
          class="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
        ></textarea>
      </div>

      <!-- Submit -->
      <div class="sm:col-span-2 lg:col-span-4">
        <button
          type="submit"
          :disabled="creating"
          class="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ creating ? "جاري الحفظ..." : "حفظ العميل المحتمل" }}
        </button>
      </div>
    </form>

    <!-- Loading -->
    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm"
    >
      جاري تحميل العملاء المحتملين...
    </div>

    <!-- Empty -->
    <div
      v-else-if="leads.length === 0"
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm"
    >
      لا يوجد عملاء محتملون حاليًا.
    </div>

    <!-- Desktop Table -->
    <div
      v-else
      class="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm lg:block"
    >
      <table class="w-full min-w-[760px] text-right text-sm">
        <thead class="bg-slate-50 text-slate-500">
          <tr>
            <th class="p-4">الاسم</th>
            <th>الشركة</th>
            <th>الهاتف</th>
            <th>المصدر</th>
            <th>القيمة المتوقعة</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="lead in paginatedLeads"
            :key="lead.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td class="p-4">
              <RouterLink
                :to="`/leads/${lead.id}`"
                class="font-semibold text-slate-900 hover:text-blue-600"
              >
                {{ lead.name }}
              </RouterLink>
            </td>

            <td>
              {{ lead.company || "—" }}
            </td>

            <td dir="ltr" class="text-right">
              {{ lead.phone || "—" }}
            </td>

            <td>
              {{ lead.source || "—" }}
            </td>

            <td>
              {{ Number(lead.value || 0).toLocaleString("ar-SA") }}
              ر.س
            </td>

            <td>
              <span
                class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                {{ lead.status }}
              </span>
            </td>

            <td class="px-4 py-3">
              <RouterLink
                :to="`/leads/${lead.id}`"
                class="inline-flex items-center justify-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                عرض
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile / Tablet Cards -->
    <div v-if="!loading && leads.length > 0" class="space-y-4 lg:hidden">
      <article
        v-for="lead in paginatedLeads"
        :key="lead.id"
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0">
            <RouterLink
              :to="`/leads/${lead.id}`"
              class="text-lg font-bold text-slate-900 hover:text-blue-600"
            >
              {{ lead.name }}
            </RouterLink>

            <p class="mt-1 text-sm text-slate-500">
              {{ lead.company || "بدون شركة" }}
            </p>
          </div>

          <span
            class="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
          >
            {{ lead.status }}
          </span>
        </div>

        <div class="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-slate-400">الهاتف</p>
            <p dir="ltr" class="mt-1 text-right font-medium text-slate-700">
              {{ lead.phone || "—" }}
            </p>
          </div>

          <div>
            <p class="text-slate-400">المصدر</p>
            <p class="mt-1 font-medium text-slate-700">
              {{ lead.source || "—" }}
            </p>
          </div>

          <div>
            <p class="text-slate-400">القيمة المتوقعة</p>
            <p class="mt-1 font-semibold text-slate-900">
              {{ Number(lead.value || 0).toLocaleString("ar-SA") }}
              ر.س
            </p>
          </div>

          <div>
            <p class="text-slate-400">الحملة</p>
            <p class="mt-1 font-medium text-slate-700">
              {{ lead.campaign || "—" }}
            </p>
          </div>
        </div>

        <RouterLink
          :to="`/leads/${lead.id}`"
          class="mt-5 flex w-full items-center justify-center rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          عرض التفاصيل
        </RouterLink>
      </article>
    </div>

    <!-- Pagination -->
    <div
      v-if="!loading && leads.length > itemsPerPage"
      class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
    >
      <p class="text-sm text-slate-500">
        عرض
        <span class="font-semibold text-slate-700">
          {{ showingFrom }}
        </span>
        -
        <span class="font-semibold text-slate-700">
          {{ showingTo }}
        </span>
        من
        <span class="font-semibold text-slate-700">
          {{ leads.length }}
        </span>
        عميل محتمل
      </p>

      <div class="flex items-center justify-center gap-2">
        <button
          type="button"
          :disabled="currentPage === 1"
          class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          @click="goToPage(currentPage - 1)"
        >
          السابق
        </button>

        <div class="flex items-center gap-1">
          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            class="h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition"
            :class="
              page === currentPage
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
            "
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button
          type="button"
          :disabled="currentPage === totalPages"
          class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          @click="goToPage(currentPage + 1)"
        >
          التالي
        </button>
      </div>
    </div>
  </section>
</template>
