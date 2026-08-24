<script setup>
import { onMounted, ref } from "vue";
import api from "@/api/axios";
import endpoints from "@/api/endpoints";

const campaigns = ref([]);
const loading = ref(true);
const error = ref("");

function formatMoney(value) {
  return `${Number(value || 0).toLocaleString("ar-SA")} ر.س`;
}

async function loadTopCampaigns() {
  try {
    loading.value = true;
    error.value = "";

    const response = await api.get(endpoints.dashboardTopCampaigns);

    campaigns.value = response.data;
  } catch (e) {
    error.value =
      e.response?.data?.error ||
      e.message ||
      "تعذر تحميل أفضل الحملات";
  } finally {
    loading.value = false;
  }
}

onMounted(loadTopCampaigns);
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

    <!-- Loading -->

    <div
      v-if="loading"
      class="p-8 text-center text-slate-500"
    >
      جاري تحميل الحملات...
    </div>

    <!-- Error -->

    <div
      v-else-if="error"
      class="p-6 text-center text-red-600"
    >
      {{ error }}
    </div>

    <!-- Data -->

    <template v-else>

      <!-- ========================= -->
      <!-- Desktop / Tablet Table -->
      <!-- ========================= -->

      <div
        class="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block"
      >
        <table class="w-full">

          <thead class="bg-slate-50">
            <tr>
              <th class="p-4 text-right lg:p-5">
                اسم الحملة
              </th>

              <th class="p-4 text-right lg:p-5">
                العميل
              </th>

              <th class="p-4 text-right lg:p-5">
                المنصة
              </th>

              <th class="p-4 text-right lg:p-5">
                الميزانية
              </th>

              <th class="p-4 text-right lg:p-5">
                الحالة
              </th>

              <th class="p-4 text-center lg:p-5">
                المنصرف
              </th>
            </tr>
          </thead>

          <tbody>
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
                {{ formatMoney(campaign.budget) }}
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
                {{ formatMoney(campaign.spent) }}
              </td>

            </tr>
          </tbody>

        </table>
      </div>

      <!-- ========================= -->
      <!-- Mobile Cards -->
      <!-- ========================= -->

      <div class="space-y-4 p-4 md:hidden">

        <div
          v-for="campaign in campaigns"
          :key="campaign.id"
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >

          <!-- Card Header -->

          <div class="mb-4 flex items-start justify-between gap-3">

            <div class="min-w-0">

              <h2
                class="truncate text-base font-semibold text-slate-900"
              >
                {{ campaign.name }}
              </h2>

              <p
                class="mt-1 truncate text-sm text-slate-500"
              >
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

              <p class="text-xs text-slate-500">
                المنصة
              </p>

              <p class="mt-1 text-sm font-medium text-slate-900">
                {{ campaign.platform }}
              </p>

            </div>

            <!-- Budget -->

            <div class="rounded-xl bg-slate-50 p-3">

              <p class="text-xs text-slate-500">
                الميزانية
              </p>

              <p class="mt-1 text-sm font-medium text-slate-900">
                {{ formatMoney(campaign.budget) }}
              </p>

            </div>

            <!-- Spent -->

            <div class="rounded-xl bg-slate-50 p-3">

              <p class="text-xs text-slate-500">
                المنصرف
              </p>

              <p class="mt-1 text-sm font-medium text-slate-900">
                {{ formatMoney(campaign.spent) }}
              </p>

            </div>

          </div>

        </div>

      </div>

    </template>

  </div>
</template>