<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import campaignsService from "@/services/campaigns.service";
import clientsService from "@/services/clients.service";

const route = useRoute();
const router = useRouter();

const campaign = ref([]);
const clients = ref([]);
const clientsLoading = ref(false);

const loading = ref(true);
const saving = ref(false);
const deleting = ref(false);

const editing = ref(false);
const showDeleteModal = ref(false);

const error = ref("");
const success = ref("");

const form = ref({
  name: "",
  clientId: null,
  client: "",
  platform: "",
  objective: "",
  budget: 0,
  currency: "SAR",
  spent: 0,
  startDate: "",
  endDate: "",
  description: "",
  status: "نشطة",
  impressions: 0,
  clicks: 0,
  conversions: 0,
});

async function loadCampaign() {
  try {
    loading.value = true;
    error.value = "";

    const data = await campaignsService.getById(route.params.id);

    campaign.value = data;

    fillForm(data);
  } catch (e) {
    error.value =
      e.response?.data?.error || e.message || "تعذر تحميل بيانات الحملة";
  } finally {
    loading.value = false;
  }
}

function fillForm(data) {
  form.value = {
    name: data.name || "",
    clientId: data.client_id ?? null,
    client: data.client || "",
    platform: data.platform || "",
    objective: data.objective || "",
    budget: Number(data.budget || 0),
    currency: data.currency || "SAR",
    spent: Number(data.spent || 0),
    startDate: data.start_date ? data.start_date.substring(0, 10) : "",
    endDate: data.end_date ? data.end_date.substring(0, 10) : "",
    description: data.description || "",
    status: data.status || "نشطة",
    impressions: Number(data.impressions || 0),
    clicks: Number(data.clicks || 0),
    conversions: Number(data.conversions || 0),
  };
}

async function loadClients() {
  try {
    clientsLoading.value = true;

    clients.value = await clientsService.getAll();
  } catch (e) {
    error.value = e.response?.data?.error || e.message || "تعذر تحميل العملاء";
  } finally {
    clientsLoading.value = false;
  }
}

function formatMoney(value, currency = "SAR") {
  const amount = Number(value || 0);

  return `${amount.toLocaleString("ar-SA")} ${
    currency === "USD" ? "$" : "ر.س"
  }`;
}

function getRemaining() {
  if (!campaign.value) return 0;

  return Number(campaign.value.budget || 0) - Number(campaign.value.spent || 0);
}

function getCtr() {
  if (!campaign.value || !campaign.value.impressions) {
    return "0.00%";
  }

  return (
    (
      (Number(campaign.value.clicks || 0) /
        Number(campaign.value.impressions)) *
      100
    ).toFixed(2) + "%"
  );
}

function startEditing() {
  fillForm(campaign.value);
  error.value = "";
  success.value = "";
  editing.value = true;
}

function cancelEditing() {
  fillForm(campaign.value);
  editing.value = false;
}

async function updateCampaign() {
  try {
    saving.value = true;
    error.value = "";
    success.value = "";

    const updated = await campaignsService.update(route.params.id, {
      client_id: form.value.clientId,
      client: form.value.client,
      name: form.value.name,
      platform: form.value.platform,
      objective: form.value.objective,
      budget: Number(form.value.budget),
      currency: form.value.currency,
      spent: Number(form.value.spent),
      start_date: form.value.startDate || null,
      end_date: form.value.endDate || null,
      description: form.value.description,
      status: form.value.status,
      impressions: Number(form.value.impressions),
      clicks: Number(form.value.clicks),
      conversions: Number(form.value.conversions),
    });

    campaign.value = updated;

    fillForm(updated);

    editing.value = false;

    success.value = "تم تحديث الحملة بنجاح";

    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (e) {
    error.value = e.response?.data?.error || e.message || "تعذر تحديث الحملة";
  } finally {
    saving.value = false;
  }
}

async function deleteCampaign() {
  try {
    deleting.value = true;
    error.value = "";

    await campaignsService.delete(route.params.id);

    showDeleteModal.value = false;

    await router.push("/campaigns");
  } catch (e) {
    error.value = e.response?.data?.error || e.message || "تعذر حذف الحملة";
  } finally {
    deleting.value = false;
  }
}

onMounted(async () => {
  await Promise.all([
    loadCampaign(),
    loadClients(),
  ]);
});
</script>

<template>
  <section class="w-full min-w-0">
    <!-- Loading -->

    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm"
    >
      جاري تحميل بيانات الحملة...
    </div>

    <!-- Error -->

    <div
      v-else-if="error && !campaign"
      class="rounded-2xl bg-red-50 p-5 text-red-700"
    >
      {{ error }}
    </div>

    <div v-else-if="campaign">
      <!-- Header -->

      <div
        class="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="min-w-0">
          <h1 class="break-words text-2xl font-bold text-slate-900 sm:text-3xl">
            {{ campaign.name }}
          </h1>

          <p class="mt-2 text-sm text-slate-500 sm:text-base">
            تفاصيل الحملة الإعلانية
          </p>
        </div>

        <!-- Actions -->

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <button
            v-if="!editing"
            type="button"
            class="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            @click="startEditing"
          >
            تعديل الحملة
          </button>

          <button
            type="button"
            class="w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto"
            @click="showDeleteModal = true"
          >
            حذف الحملة
          </button>
        </div>
      </div>

      <!-- Success -->

      <div
        v-if="success"
        class="mb-6 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700"
      >
        {{ success }}
      </div>

      <!-- Error -->

      <div
        v-if="error"
        class="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
      >
        {{ error }}
      </div>

      <!-- ========================= -->
      <!-- Edit Form -->
      <!-- ========================= -->

      <form
        v-if="editing"
        class="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6"
        @submit.prevent="updateCampaign"
      >
        <h2 class="mb-6 text-xl font-semibold">تعديل بيانات الحملة</h2>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <!-- Name -->

          <div>
            <label class="mb-2 block text-sm font-medium"> اسم الحملة </label>

            <input
              v-model="form.name"
              required
              type="text"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Client -->

          <div>
            <label class="mb-2 block text-sm font-medium"> العميل </label>

            <select
              v-model="form.clientId"
              required
              :disabled="clientsLoading"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 disabled:bg-slate-100"
              @change="
                form.client =
                  clients.find(
                    (client) => Number(client.id) === Number(form.clientId),
                  )?.name || ''
              "
            >
              <option :value="null" disabled>
                {{ clientsLoading ? "جاري تحميل العملاء..." : "اختر العميل" }}
              </option>

              <option
                v-for="client in clients"
                :key="client.id"
                :value="client.id"
              >
                {{ client.name }}
              </option>
            </select>
          </div>

          <!-- Platform -->

          <div>
            <label class="mb-2 block text-sm font-medium"> المنصة </label>

            <select
              v-model="form.platform"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            >
              <option>Google Ads</option>
              <option>Meta Ads</option>
              <option>TikTok Ads</option>
              <option>Snapchat Ads</option>
            </select>
          </div>

          <!-- Objective -->

          <div>
            <label class="mb-2 block text-sm font-medium"> الهدف </label>

            <select
              v-model="form.objective"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            >
              <option>زيادة المبيعات</option>
              <option>جمع العملاء المحتملين</option>
              <option>زيارات الموقع</option>
              <option>رفع الوعي بالعلامة التجارية</option>
            </select>
          </div>

          <!-- Budget -->

          <div>
            <label class="mb-2 block text-sm font-medium"> الميزانية </label>

            <input
              v-model.number="form.budget"
              type="number"
              min="0"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Spent -->

          <div>
            <label class="mb-2 block text-sm font-medium"> المنصرف </label>

            <input
              v-model.number="form.spent"
              type="number"
              min="0"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Start Date -->

          <div>
            <label class="mb-2 block text-sm font-medium">
              تاريخ البداية
            </label>

            <input
              v-model="form.startDate"
              type="date"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- End Date -->

          <div>
            <label class="mb-2 block text-sm font-medium">
              تاريخ النهاية
            </label>

            <input
              v-model="form.endDate"
              type="date"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Status -->

          <div>
            <label class="mb-2 block text-sm font-medium"> الحالة </label>

            <select
              v-model="form.status"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            >
              <option>نشطة</option>
              <option>متوقفة</option>
              <option>مكتملة</option>
            </select>
          </div>

          <!-- Impressions -->

          <div>
            <label class="mb-2 block text-sm font-medium"> مرات الظهور </label>

            <input
              v-model.number="form.impressions"
              type="number"
              min="0"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Clicks -->

          <div>
            <label class="mb-2 block text-sm font-medium"> النقرات </label>

            <input
              v-model.number="form.clicks"
              type="number"
              min="0"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Conversions -->

          <div>
            <label class="mb-2 block text-sm font-medium"> التحويلات </label>

            <input
              v-model.number="form.conversions"
              type="number"
              min="0"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Description -->

          <div class="md:col-span-2">
            <label class="mb-2 block text-sm font-medium"> وصف الحملة </label>

            <textarea
              v-model="form.description"
              rows="4"
              class="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            ></textarea>
          </div>
        </div>

        <!-- Form Actions -->

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
            :disabled="saving"
            @click="cancelEditing"
          >
            إلغاء
          </button>

          <button
            type="submit"
            class="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
            :disabled="saving"
          >
            {{ saving ? "جاري الحفظ..." : "حفظ التعديلات" }}
          </button>
        </div>
      </form>

      <!-- ========================= -->
      <!-- Main Information -->
      <!-- ========================= -->

      <div class="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-2"
        >
          <h2 class="mb-5 text-lg font-semibold sm:mb-6 sm:text-xl">
            معلومات الحملة
          </h2>

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <p class="text-sm text-slate-500">العميل</p>

              <h3 class="mt-1 break-words font-semibold">
                {{ campaign.client }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">المنصة</p>

              <h3 class="mt-1 break-words font-semibold">
                {{ campaign.platform }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">الهدف</p>

              <h3 class="mt-1 break-words font-semibold">
                {{ campaign.objective }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">الحالة</p>

              <span
                class="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
              >
                {{ campaign.status }}
              </span>
            </div>

            <div>
              <p class="text-sm text-slate-500">تاريخ البداية</p>

              <h3 class="mt-1 font-semibold">
                {{ campaign.startDate }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">تاريخ النهاية</p>

              <h3 class="mt-1 font-semibold">
                {{ campaign.endDate }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Budget -->

        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
          <h2 class="mb-5 text-lg font-semibold sm:mb-6 sm:text-xl">
            الميزانية
          </h2>

          <div class="grid grid-cols-2 gap-4 lg:grid-cols-1 lg:gap-6">
            <div>
              <p class="text-sm text-slate-500">الميزانية</p>

              <h3 class="mt-2 text-xl font-bold sm:text-2xl">
                {{ formatMoney(campaign.budget, campaign.currency) }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">المنصرف</p>

              <h3 class="mt-2 text-xl font-bold sm:text-2xl">
                {{ formatMoney(campaign.spent, campaign.currency) }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">المتبقي</p>

              <h3 class="mt-2 text-xl font-bold text-emerald-600 sm:text-2xl">
                {{ formatMoney(getRemaining(), campaign.currency) }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->

      <div
        class="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-5"
      >
        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <p class="text-sm text-slate-500">مرات الظهور</p>

          <h3 class="mt-2 text-xl font-bold sm:text-2xl">
            {{ Number(campaign.impressions).toLocaleString("en-US") }}
          </h3>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <p class="text-sm text-slate-500">النقرات</p>

          <h3 class="mt-2 text-xl font-bold sm:text-2xl">
            {{ Number(campaign.clicks).toLocaleString("en-US") }}
          </h3>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <p class="text-sm text-slate-500">CTR</p>

          <h3 class="mt-2 text-xl font-bold sm:text-2xl">
            {{ getCtr() }}
          </h3>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <p class="text-sm text-slate-500">التحويلات</p>

          <h3 class="mt-2 text-xl font-bold sm:text-2xl">
            {{ Number(campaign.conversions).toLocaleString("en-US") }}
          </h3>
        </div>

        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
        >
          <p class="text-sm text-slate-500">ROAS</p>

          <h3 class="mt-2 text-xl font-bold sm:text-2xl">—</h3>
        </div>
      </div>

      <!-- Description -->

      <div
        v-if="campaign.description"
        class="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      >
        <h2 class="mb-3 text-lg font-semibold">وصف الحملة</h2>

        <p class="leading-8 text-slate-600">
          {{ campaign.description }}
        </p>
      </div>
    </div>

    <!-- Delete Modal -->

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 class="text-xl font-bold text-slate-900">تأكيد حذف الحملة</h2>

        <p class="mt-3 leading-7 text-slate-500">
          هل أنت متأكد من حذف
          <span class="font-semibold text-slate-900">
            {{ campaign?.name }}
          </span>
          ؟
          <br />
          لا يمكن التراجع عن هذه العملية.
        </p>

        <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="w-full rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
            :disabled="deleting"
            @click="showDeleteModal = false"
          >
            إلغاء
          </button>

          <button
            type="button"
            class="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60 sm:w-auto"
            :disabled="deleting"
            @click="deleteCampaign"
          >
            {{ deleting ? "جاري الحذف..." : "نعم، حذف الحملة" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
