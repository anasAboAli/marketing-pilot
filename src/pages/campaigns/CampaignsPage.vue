<script setup>
import { computed, onMounted, ref } from "vue";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";
import { RouterLink } from "vue-router";

const campaigns = ref([]);
const loading = ref(true);
const error = ref("");

const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() =>
  Math.ceil(campaigns.value.length / itemsPerPage),
);

const paginatedCampaigns = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return campaigns.value.slice(start, end);
});

const pageNumbers = computed(() => {
  return Array.from({ length: totalPages.value }, (_, index) => index + 1);
});

function formatMoney(value, currency = "SAR") {
  return `${Number(value || 0).toLocaleString("ar-SA")} ${
    currency === "SAR" ? "ر.س" : currency
  }`;
}

function getStatusClass(status) {
  if (status === "نشطة") {
    return "bg-green-100 text-green-700";
  }

  if (status === "مكتملة") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "متوقفة") {
    return "bg-red-100 text-red-700";
  }

  return "bg-slate-100 text-slate-700";
}

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return;

  currentPage.value = page;
}

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

async function loadCampaigns() {
  try {
    loading.value = true;
    error.value = "";

    const response = await api.get(endpoints.campaigns);

    campaigns.value = Array.isArray(response.data) ? response.data : [];

    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value;
    }
  } catch (e) {
    console.error("Failed to load campaigns:", e);

    error.value = e.response?.data?.error || e.message || "تعذر تحميل الحملات";
  } finally {
    loading.value = false;
  }
}

onMounted(loadCampaigns);
</script>

<template>
  <div class="space-y-6" dir="rtl">
    <!-- Page Header -->
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold text-slate-900">الحملات</h1>

        <p class="mt-1 text-sm text-slate-500">
          إدارة ومتابعة الحملات الإعلانية
        </p>
      </div>

      <RouterLink
        to="/campaigns/create"
        class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        + إنشاء حملة
      </RouterLink>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm"
    >
      <p class="text-sm text-slate-500">جاري تحميل الحملات...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700"
    >
      {{ error }}
    </div>

    <!-- Empty -->
    <div
      v-else-if="campaigns.length === 0"
      class="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm"
    >
      <p class="font-medium text-slate-700">لا توجد حملات متاحة</p>

      <p class="mt-1 text-sm text-slate-500">
        لم يتم العثور على أي حملات في قاعدة البيانات.
      </p>
    </div>

    <template v-else>
      <!-- Desktop / Laptop -->
      <div
        class="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block"
      >
        <div class="border-b border-slate-200 p-6">
          <h2 class="text-lg font-semibold text-slate-900">قائمة الحملات</h2>

          <p class="mt-1 text-sm text-slate-500">
            عرض {{ paginatedCampaigns.length }} من أصل
            {{ campaigns.length }} حملة
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[900px]">
            <thead class="bg-slate-50">
              <tr class="text-right text-sm text-slate-500">
                <th class="p-4 font-semibold lg:p-5">اسم الحملة</th>

                <th class="p-4 font-semibold lg:p-5">العميل</th>

                <th class="p-4 font-semibold lg:p-5">المنصة</th>

                <th class="p-4 font-semibold lg:p-5">الميزانية</th>

                <th class="p-4 font-semibold lg:p-5">المصروف</th>

                <th class="p-4 font-semibold lg:p-5">الحالة</th>

                <th class="p-4 text-center font-semibold lg:p-5">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="campaign in paginatedCampaigns"
                :key="campaign.id"
                class="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td class="p-4 lg:p-5">
                  <div class="font-semibold text-slate-900">
                    {{ campaign.name }}
                  </div>
                </td>

                <td class="p-4 text-slate-600 lg:p-5">
                  {{ campaign.client || "-" }}
                </td>

                <td class="p-4 text-slate-600 lg:p-5">
                  {{ campaign.platform || "-" }}
                </td>

                <td class="p-4 font-medium text-slate-900 lg:p-5">
                  {{ formatMoney(campaign.budget, campaign.currency) }}
                </td>

                <td class="p-4 font-medium text-slate-900 lg:p-5">
                  {{ formatMoney(campaign.spent, campaign.currency) }}
                </td>

                <td class="p-4 lg:p-5">
                  <span
                    class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                    :class="getStatusClass(campaign.status)"
                  >
                    {{ campaign.status || "غير محددة" }}
                  </span>
                </td>

                <td class="p-4 text-center lg:p-5">
                  <RouterLink
                    :to="`/campaigns/${campaign.id}`"
                    class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                  >
                    عرض
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tablet / Mobile -->
      <div class="space-y-4 lg:hidden">
        <div
          v-for="campaign in paginatedCampaigns"
          :key="campaign.id"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <!-- Header -->
          <div class="mb-5 flex items-start justify-between gap-4">
            <div class="min-w-0">
              <h2 class="truncate text-base font-bold text-slate-900">
                {{ campaign.name }}
              </h2>

              <p class="mt-1 truncate text-sm text-slate-500">
                {{ campaign.client || "بدون عميل" }}
              </p>
            </div>

            <span
              class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
              :class="getStatusClass(campaign.status)"
            >
              {{ campaign.status || "غير محددة" }}
            </span>
          </div>

          <!-- Information -->
          <div class="grid grid-cols-2 gap-3">
            <div class="rounded-xl bg-slate-50 p-3">
              <p class="text-xs text-slate-500">المنصة</p>

              <p class="mt-1 truncate text-sm font-semibold text-slate-900">
                {{ campaign.platform || "-" }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-3">
              <p class="text-xs text-slate-500">الميزانية</p>

              <p class="mt-1 text-sm font-semibold text-slate-900">
                {{ formatMoney(campaign.budget, campaign.currency) }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-3">
              <p class="text-xs text-slate-500">المصروف</p>

              <p class="mt-1 text-sm font-semibold text-slate-900">
                {{ formatMoney(campaign.spent, campaign.currency) }}
              </p>
            </div>

            <div class="rounded-xl bg-slate-50 p-3">
              <p class="text-xs text-slate-500">الهدف</p>

              <p class="mt-1 truncate text-sm font-semibold text-slate-900">
                {{ campaign.objective || "-" }}
              </p>
            </div>
          </div>

          <!-- عرض الحملة -->
          <div class="mt-4">
            <RouterLink
              :to="`/campaigns/${campaign.id}`"
              class="flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              عرض الحملة
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
      >
        <p class="text-sm text-slate-500">
          الصفحة {{ currentPage }} من {{ totalPages }}
        </p>

        <div class="flex items-center gap-2">
          <!-- Previous -->
          <button
            type="button"
            :disabled="currentPage === 1"
            class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            @click="previousPage"
          >
            السابق
          </button>

          <!-- Page Numbers -->
          <button
            v-for="page in pageNumbers"
            :key="page"
            type="button"
            class="hidden h-9 min-w-9 rounded-xl px-3 text-sm font-semibold transition sm:block"
            :class="
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            "
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <!-- Mobile Current Page -->
          <span
            class="flex h-9 min-w-9 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-semibold text-white sm:hidden"
          >
            {{ currentPage }}
          </span>

          <!-- Next -->
          <button
            type="button"
            :disabled="currentPage === totalPages"
            class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            @click="nextPage"
          >
            التالي
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
