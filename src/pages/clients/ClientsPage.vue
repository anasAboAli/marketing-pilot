<script setup>
import { computed, onMounted, ref } from "vue";
import clientsService from "@/services/clients.service";

const clients = ref([]);
const showForm = ref(false);

const loading = ref(true);
const creating = ref(false);

const error = ref("");
const success = ref("");

const currentPage = ref(1);
const itemsPerPage = 10;

const form = ref({
  name: "",
  industry: "",
  manager: "",
  status: "نشط",
  campaigns: 0,
  revenue: 0,
});

async function load() {
  try {
    loading.value = true;
    error.value = "";

    clients.value = await clientsService.getAll();

    currentPage.value = 1;
  } catch (e) {
    error.value = e.response?.data?.error || e.message || "تعذر تحميل العملاء";
  } finally {
    loading.value = false;
  }
}

async function create() {
  try {
    creating.value = true;
    error.value = "";
    success.value = "";

    const client = await clientsService.create({
      ...form.value,
      campaigns: Number(form.value.campaigns),
      revenue: Number(form.value.revenue),
    });

    clients.value.unshift(client);

    form.value = {
      name: "",
      industry: "",
      manager: "",
      status: "نشط",
      campaigns: 0,
      revenue: 0,
    };

    showForm.value = false;

    // نرجع للصفحة الأولى حتى يظهر العميل الجديد
    currentPage.value = 1;

    success.value = "تم إضافة العميل بنجاح";

    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (e) {
    error.value = e.response?.data?.error || e.message || "تعذر إضافة العميل";
  } finally {
    creating.value = false;
  }
}

/*
|--------------------------------------------------------------------------
| Pagination
|--------------------------------------------------------------------------
*/

const totalPages = computed(() => {
  return Math.ceil(clients.value.length / itemsPerPage);
});

const paginatedClients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;

  return clients.value.slice(start, start + itemsPerPage);
});

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

const visiblePages = computed(() => {
  const pages = [];

  for (let page = 1; page <= totalPages.value; page++) {
    pages.push(page);
  }

  return pages;
});

onMounted(load);
</script>

<template>
  <section class="space-y-6">
    <!-- ========================= -->
    <!-- Header -->
    <!-- ========================= -->

    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p class="text-sm font-semibold text-blue-600">إدارة العلاقات</p>

        <h1 class="mt-1 text-2xl font-bold sm:text-3xl">العملاء</h1>

        <p class="mt-2 text-slate-500">
          إدارة جميع العملاء ومتابعة أداء حساباتهم.
        </p>
      </div>

      <button
        type="button"
        class="cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        @click="showForm = !showForm"
      >
        + إضافة عميل
      </button>
    </div>

    <!-- ========================= -->
    <!-- Add Client Form -->
    <!-- ========================= -->

    <form
      v-if="showForm"
      id="addClint"
      class="grid gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:grid-cols-4"
      @submit.prevent="create"
    >
      <input
        v-model="form.name"
        required
        placeholder="اسم العميل"
        class="rounded-xl border-2 border-black/20 bg-white px-4 py-3 focus:outline-none"
      />

      <input
        v-model="form.industry"
        placeholder="القطاع"
        class="rounded-xl border-2 border-black/20 bg-white px-4 py-3"
      />

      <input
        v-model="form.manager"
        placeholder="مدير الحساب"
        class="rounded-xl border-2 border-black/20 bg-white px-4 py-3"
      />

      <button
        type="submit"
        :disabled="creating"
        class="cursor-pointer rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ creating ? "جاري الحفظ..." : "حفظ العميل" }}
      </button>
    </form>

    <!-- ========================= -->
    <!-- Messages -->
    <!-- ========================= -->

    <p v-if="success" class="rounded-xl bg-emerald-50 p-4 text-emerald-700">
      {{ success }}
    </p>

    <p v-if="error" class="rounded-xl bg-red-50 p-4 text-red-700">
      {{ error }}
      — شغّل الخادم عبر
      <code>npm run server</code>
    </p>

    <!-- ========================= -->
    <!-- Desktop / Laptop -->
    <!-- ========================= -->

    <div
      class="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block"
    >
      <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-right text-sm">
          <thead class="bg-slate-50 text-slate-500">
            <tr>
              <th class="p-4 font-semibold">اسم العميل</th>

              <th class="p-4 font-semibold">القطاع</th>

              <th class="p-4 font-semibold">الحملات</th>

              <th class="p-4 font-semibold">الإيرادات</th>

              <th class="p-4 font-semibold">مدير الحساب</th>

              <th class="p-4 font-semibold">الحالة</th>

              <th class="p-4 text-center font-semibold">الإجراءات</th>
            </tr>
          </thead>

          <tbody>
            <!-- Loading -->

            <tr v-if="loading">
              <td colspan="7" class="p-10 text-center text-slate-500">
                جاري تحميل العملاء...
              </td>
            </tr>

            <!-- Empty -->

            <tr v-else-if="paginatedClients.length === 0">
              <td colspan="7" class="p-10 text-center text-slate-500">
                لا توجد بيانات للعملاء
              </td>
            </tr>

            <!-- Clients -->

            <tr
              v-for="client in paginatedClients"
              v-else
              :key="client.id"
              class="border-t border-slate-100 transition hover:bg-slate-50"
            >
              <td class="p-4 font-semibold">
                {{ client.name }}
              </td>

              <td class="p-4">
                {{ client.industry || "-" }}
              </td>

              <td class="p-4">
                {{ client.campaigns ?? 0 }}
              </td>

              <td class="p-4">
                {{ client.revenue ?? 0 }}
              </td>

              <td class="p-4">
                {{ client.manager || "-" }}
              </td>

              <td class="p-4">
                <span
                  class="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                >
                  {{ client.status || "غير محددة" }}
                </span>
              </td>

              <td class="p-4 text-center">
                <RouterLink
                  :to="`/clients/${client.id}`"
                  class="inline-flex rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold transition hover:bg-blue-600 hover:text-white"
                >
                  عرض
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ========================= -->
    <!-- Mobile / Tablet Cards -->
    <!-- ========================= -->

    <div v-if="!loading" class="grid gap-4 md:hidden">
      <!-- Empty -->

      <div
        v-if="paginatedClients.length === 0"
        class="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm"
      >
        لا توجد بيانات للعملاء
      </div>

      <!-- Client Cards -->

      <div
        v-for="client in paginatedClients"
        :key="client.id"
        class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
      >
        <!-- Card Header -->

        <div class="mb-4 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="truncate text-base font-bold text-slate-900">
              {{ client.name }}
            </h2>

            <p class="mt-1 truncate text-sm text-slate-500">
              {{ client.industry || "قطاع غير محدد" }}
            </p>
          </div>

          <span
            class="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
          >
            {{ client.status || "غير محددة" }}
          </span>
        </div>

        <!-- Client Information -->

        <div class="grid grid-cols-2 gap-3">
          <div class="rounded-xl bg-slate-50 p-3">
            <p class="text-xs text-slate-500">الحملات</p>

            <p class="mt-1 text-sm font-semibold text-slate-900">
              {{ client.campaigns ?? 0 }}
            </p>
          </div>

          <div class="rounded-xl bg-slate-50 p-3">
            <p class="text-xs text-slate-500">الإيرادات</p>

            <p class="mt-1 text-sm font-semibold text-slate-900">
              {{ client.revenue ?? 0 }}
            </p>
          </div>

          <div class="col-span-2 rounded-xl bg-slate-50 p-3">
            <p class="text-xs text-slate-500">مدير الحساب</p>

            <p class="mt-1 text-sm font-semibold text-slate-900">
              {{ client.manager || "-" }}
            </p>
          </div>
        </div>

        <!-- View Button -->

        <div class="mt-4">
          <RouterLink
            :to="`/clients/${client.id}`"
            class="flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            عرض العميل
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- ========================= -->
    <!-- Pagination -->
    <!-- ========================= -->

    <div
      v-if="!loading && totalPages > 1"
      class="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
    >
      <!-- Page Info -->

      <p class="text-sm text-slate-500">
        الصفحة
        <span class="font-semibold text-slate-900">
          {{ currentPage }}
        </span>
        من
        <span class="font-semibold text-slate-900">
          {{ totalPages }}
        </span>
      </p>

      <!-- Pagination Buttons -->

      <div class="flex items-center gap-2">
        <!-- Previous -->

        <button
          type="button"
          :disabled="currentPage === 1"
          class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          @click="previousPage"
        >
          السابق
        </button>

        <!-- Page Numbers -->

        <button
          v-for="page in visiblePages"
          :key="page"
          type="button"
          class="hidden h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition sm:block"
          :class="
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
          "
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <!-- Next -->

        <button
          type="button"
          :disabled="currentPage === totalPages"
          class="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          @click="nextPage"
        >
          التالي
        </button>
      </div>
    </div>
  </section>
</template>

<style>
#addClint input:focus {
  outline: none;
  border-color: black;
}
</style>
