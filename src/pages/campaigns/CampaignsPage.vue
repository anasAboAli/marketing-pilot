<script setup>
import { onMounted, ref } from "vue";
import campaignsService from "@/services/campaigns.service";

const campaigns = ref([]);

const loading = ref(true);
const error = ref("");

async function loadCampaigns() {
  try {
    loading.value = true;
    error.value = "";

    campaigns.value = await campaignsService.getAll();
  } catch (e) {
    error.value = e.response?.data?.error || e.message || "تعذر تحميل الحملات";
  } finally {
    loading.value = false;
  }
}

function getRemaining(campaign) {
  const budget = Number(campaign.budget || 0);
  const spent = Number(campaign.spent || 0);

  return `${(budget - spent).toLocaleString("ar-SA")} ر.س`;
}

function formatMoney(value, currency = "SAR") {
  const amount = Number(value || 0);

  return `${amount.toLocaleString("ar-SA")} ${
    currency === "USD" ? "$" : "ر.س"
  }`;
}

onMounted(loadCampaigns);
</script>

<template>
  <div class="w-full min-w-0">
    <!-- Header -->
    <div
      class="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold sm:text-3xl">الحملات الإعلانية</h1>

        <p class="mt-2 text-sm text-slate-500 sm:text-base">
          إدارة جميع الحملات الإعلانية
        </p>
      </div>

      <RouterLink
        to="/campaigns/create"
        class="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
        style="color: #fff"
      >
        + إنشاء حملة
      </RouterLink>
    </div>

    <!-- check Error -->

    <div v-if="error" class="mb-6 rounded-xl bg-red-50 p-4 text-red-700">
      {{ error }}
    </div>

    <!-- Loading -->

    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm"
    >
      جاري تحميل الحملات...
    </div>

    <!-- ========================= -->
    <!-- Desktop / Tablet Table -->
    <!-- ========================= -->

    <div
      v-else
      class="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block"
    >
      <table class="w-full">
        <thead class="bg-slate-50">
          <tr>
            <th class="p-4 text-right lg:p-5">اسم الحملة</th>

            <th class="p-4 text-right lg:p-5">العميل</th>

            <th class="p-4 text-right lg:p-5">المنصة</th>

            <th class="p-4 text-right lg:p-5">الميزانية</th>

            <th class="p-4 text-right lg:p-5">المنصرف</th>

            <th class="p-4 text-right lg:p-5">الحالة</th>

            <th class="p-4 text-center lg:p-5">الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="7" class="p-8 text-center text-slate-500">
              جاري تحميل الحملات...
            </td>
          </tr>

          <tr v-else-if="error">
            <td colspan="7" class="p-8 text-center text-red-600">
              {{ error }}
            </td>
          </tr>

          <tr v-else-if="campaigns.length === 0">
            <td colspan="7" class="p-8 text-center text-slate-500">
              لا توجد حملات حاليًا
            </td>
          </tr>
          <tr
            v-for="campaign in campaigns"
            :key="campaign.id"
            class="border-t border-slate-100 transition hover:bg-slate-50"
          >
            <td class="p-4 font-medium lg:p-5">
              {{ campaign.name }}
            </td>

            <td class="p-4 lg:p-5">
              {{ campaign.client }}
            </td>

            <td class="p-4 lg:p-5">
              {{ campaign.platform }}
            </td>

            <td class="p-4 lg:p-5">
              {{ formatMoney(campaign.budget, campaign.currency) }}
            </td>

            <td class="p-4 lg:p-5">
              {{ formatMoney(campaign.spent, campaign.currency) }}
            </td>

            <td class="p-4 lg:p-5">
              <span
                :class="[
                  'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
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

            <td class="p-4 text-center lg:p-5">
              <RouterLink
                id="whenHover"
                :to="`/campaigns/${campaign.id}`"
                class="inline-flex rounded-lg bg-slate-100 px-3 py-2 text-sm transition hover:bg-blue-600 hover:text-white"
              >
                عرض
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ========================= -->
    <!-- Mobile Cards -->
    <!-- ========================= -->

    <div v-if="!loading" class="space-y-4 md:hidden">
      <div
        v-for="campaign in campaigns"
        :key="campaign.id"
        class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <!-- Card Header -->

        <div class="mb-4 flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="truncate text-base font-semibold text-slate-900">
              {{ campaign.name }}
            </h2>

            <p class="mt-1 truncate text-sm text-slate-500">
              {{ campaign.client }}
            </p>
          </div>

          <!-- Status -->

          <span
            class="shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
            :class="
              campaign.status === 'نشطة'
                ? 'bg-green-100 text-green-700'
                : campaign.status === 'مكتملة'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-red-100 text-red-700'
            "
          >
            {{ campaign.status }}
          </span>
        </div>

        <!-- Campaign Information -->

        <div class="grid grid-cols-2 gap-3">
          <!-- Platform -->

          <div class="rounded-xl bg-slate-50 p-3">
            <p class="text-xs text-slate-500">المنصة</p>

            <p class="mt-1 text-sm font-medium text-slate-900">
              {{ campaign.platform }}
            </p>
          </div>

          <!-- Budget -->

          <div class="rounded-xl bg-slate-50 p-3">
            <p class="text-xs text-slate-500">الميزانية</p>

            <p class="mt-1 text-sm font-medium text-slate-900">
              {{ formatMoney(campaign.budget, campaign.currency) }}
            </p>
          </div>

          <!-- Spent -->

          <div class="rounded-xl bg-slate-50 p-3">
            <p class="text-xs text-slate-500">المنصرف</p>

            <p class="mt-1 text-sm font-medium text-slate-900">
              {{ formatMoney(campaign.spent, campaign.currency) }}
            </p>
          </div>

          <!-- Remaining -->

          <div class="rounded-xl bg-slate-50 p-3">
            <p class="text-xs text-slate-500">المتبقي</p>

            <p class="mt-1 text-sm font-medium text-slate-900">
              {{ getRemaining(campaign) }}
            </p>
          </div>
        </div>

        <!-- Action -->

        <RouterLink
          id="whenHover"
          :to="`/campaigns/${campaign.id}`"
          class="mt-4 flex w-full items-center justify-center rounded-xl bg-slate-100 px-4 py-3 text-sm font-medium transition hover:bg-blue-600 hover:text-white"
        >
          عرض تفاصيل الحملة
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style>
#whenHover:hover {
  color: #fff;
}
</style>
