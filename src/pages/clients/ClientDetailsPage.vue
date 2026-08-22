<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import clientsService from "@/services/clients.service";
import campaignsService from "@/services/campaigns.service";

const route = useRoute();
const router = useRouter();

const client = ref(null);
const campaigns = ref([]);
const campaignsLoading = ref(false);

const loading = ref(true);
const saving = ref(false);
const deleting = ref(false);

const editing = ref(false);
const showDeleteModal = ref(false);

const error = ref("");
const success = ref("");

const form = ref({
  name: "",
  industry: "",
  manager: "",
  status: "نشط",
  campaigns: 0,
  revenue: 0,
});

async function loadClient() {
  try {
    const data = await clientsService.getById(route.params.id);

    client.value = data;
  } catch (e) {
    error.value =
      e.response?.data?.error || e.message || "تعذر تحميل بيانات العميل";
  }
}

async function loadCampaigns() {
  try {
    campaignsLoading.value = true;

    campaigns.value = await campaignsService.getByClientId(route.params.id);
  } catch (e) {
    error.value =
      e.response?.data?.error || e.message || "تعذر تحميل حملات العميل";
  } finally {
    campaignsLoading.value = false;
  }
}

function fillForm(data) {
  form.value = {
    name: data.name || "",
    industry: data.industry || "",
    manager: data.manager || "",
    status: data.status || "نشط",
    campaigns: Number(data.campaigns || 0),
    revenue: Number(data.revenue || 0),
  };
}

function formatMoney(value, currency = "SAR") {
  const amount = Number(value || 0);

  return `${amount.toLocaleString("ar-SA")} ${
    currency === "USD" ? "$" : "ر.س"
  }`;
}

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("ar-SA");
}

function getStatusClass(status) {
  if (status === "نشطة" || status === "نشط") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "متوقفة") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "مكتملة") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-slate-100 text-slate-700";
}

function startEditing() {
  fillForm(client.value);

  error.value = "";
  success.value = "";

  editing.value = true;
}

function cancelEditing() {
  fillForm(client.value);

  editing.value = false;
}

async function updateClient() {
  try {
    saving.value = true;

    error.value = "";
    success.value = "";

    const updated = await clientsService.update(route.params.id, {
      ...form.value,
      campaigns: Number(form.value.campaigns),
      revenue: Number(form.value.revenue),
    });

    client.value = updated;

    fillForm(updated);

    editing.value = false;

    success.value = "تم تحديث بيانات العميل بنجاح";

    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (e) {
    error.value =
      e.response?.data?.error || e.message || "تعذر تحديث بيانات العميل";
  } finally {
    saving.value = false;
  }
}

async function deleteClient() {
  try {
    deleting.value = true;

    error.value = "";

    await clientsService.delete(route.params.id);

    showDeleteModal.value = false;

    await router.push("/clients");
  } catch (e) {
    error.value = e.response?.data?.error || e.message || "تعذر حذف العميل";
  } finally {
    deleting.value = false;
  }
}

onMounted(async () => {
  loading.value = true;

  await Promise.all([loadClient(), loadCampaigns()]);

  loading.value = false;
});
</script>

<template>
  <section class="w-full min-w-0">
    <!-- Loading -->
    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm"
    >
      جاري تحميل بيانات العميل...
    </div>

    <!-- Error -->
    <div
      v-else-if="error && !client"
      class="rounded-2xl bg-red-50 p-5 text-red-700"
    >
      {{ error }}
    </div>

    <!-- Client -->
    <div v-else-if="client">
      <!-- Header -->
      <div
        class="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 class="break-words text-2xl font-bold text-slate-900 sm:text-3xl">
            {{ client.name }}
          </h1>

          <p class="mt-2 text-sm text-slate-500 sm:text-base">تفاصيل العميل</p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <button
            v-if="!editing"
            type="button"
            class="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            @click="startEditing"
          >
            تعديل العميل
          </button>

          <button
            type="button"
            class="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 sm:w-auto"
            @click="showDeleteModal = true"
          >
            حذف العميل
          </button>
        </div>
      </div>

      <!-- Edit Form -->
      <form
        v-if="editing"
        class="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6"
        @submit.prevent="updateClient"
      >
        <h2 class="mb-6 text-xl font-semibold">تعديل بيانات العميل</h2>

        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <!-- Name -->
          <div>
            <label class="mb-2 block text-sm font-medium"> اسم العميل </label>

            <input
              v-model="form.name"
              required
              type="text"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Industry -->
          <div>
            <label class="mb-2 block text-sm font-medium"> القطاع </label>

            <input
              v-model="form.industry"
              required
              type="text"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Manager -->
          <div>
            <label class="mb-2 block text-sm font-medium"> مدير الحساب </label>

            <input
              v-model="form.manager"
              required
              type="text"
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
              <option value="نشط">نشط</option>
              <option value="متوقف">متوقف</option>
              <option value="مكتمل">مكتمل</option>
            </select>
          </div>

          <!-- Campaigns -->
          <div>
            <label class="mb-2 block text-sm font-medium"> عدد الحملات </label>

            <input
              v-model.number="form.campaigns"
              type="number"
              min="0"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>

          <!-- Revenue -->
          <div>
            <label class="mb-2 block text-sm font-medium"> الإيرادات </label>

            <input
              v-model.number="form.revenue"
              type="number"
              min="0"
              step="0.01"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
            />
          </div>
        </div>

        <!-- Actions -->
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

      <!-- Error -->
      <div
        v-if="error"
        class="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
      >
        {{ error }}
      </div>

      <!-- Main Info -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <!-- Information -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2"
        >
          <h2 class="mb-6 text-xl font-semibold">معلومات العميل</h2>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p class="text-sm text-slate-500">اسم العميل</p>

              <h3 class="mt-1 font-semibold">
                {{ client.name }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">القطاع</p>

              <h3 class="mt-1 font-semibold">
                {{ client.industry }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">مدير الحساب</p>

              <h3 class="mt-1 font-semibold">
                {{ client.manager }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">تاريخ الانضمام</p>

              <h3 class="mt-1 font-semibold">
                {{ formatDate(client.created_at) }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <h2 class="mb-6 text-xl font-semibold">ملخص</h2>

          <div class="space-y-6">
            <div>
              <p class="text-sm text-slate-500">عدد الحملات</p>

              <h3 class="mt-2 text-2xl font-bold">
                {{ campaigns.length }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">إجمالي الإيرادات</p>

              <h3 class="mt-2 text-2xl font-bold">
                {{ Number(client.revenue || 0).toLocaleString("ar-SA") }}
                ر.س
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">الحالة</p>

              <span
                class="mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold"
                :class="getStatusClass(client.status)"
              >
                {{ client.status }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Campaigns -->
      <div
        class="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-8 sm:p-6"
      >
        <div
          class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
        >
          <h2 class="text-xl font-semibold">الحملات التابعة للعميل</h2>

          <span class="text-sm text-slate-500">
            {{ campaigns.length }} حملة
          </span>
        </div>

        <!-- Campaign Loading -->
        <div v-if="campaignsLoading" class="py-8 text-center text-slate-500">
          جاري تحميل الحملات...
        </div>

        <!-- No Campaigns -->
        <div
          v-else-if="campaigns.length === 0"
          class="rounded-xl bg-slate-50 p-8 text-center text-slate-500"
        >
          لا توجد حملات مرتبطة بهذا العميل حتى الآن.
        </div>

        <!-- Campaign Table -->
        <div v-else class="overflow-x-auto">
          <table class="w-full min-w-[700px] text-right text-sm">
            <thead class="bg-slate-50 text-slate-500">
              <tr>
                <th class="p-4">الحملة</th>

                <th>المنصة</th>

                <th>الميزانية</th>

                <th>المنصرف</th>

                <th>الحالة</th>

                <th>الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="campaign in campaigns"
                :key="campaign.id"
                class="border-t border-slate-100"
              >
                <td class="p-4">
                  <div>
                    <p class="font-semibold text-slate-900">
                      {{ campaign.name }}
                    </p>

                    <p class="mt-1 text-xs text-slate-500">
                      {{ campaign.objective }}
                    </p>
                  </div>
                </td>

                <td>
                  {{ campaign.platform }}
                </td>

                <td>
                  {{ formatMoney(campaign.budget, campaign.currency) }}
                </td>

                <td>
                  {{ formatMoney(campaign.spent, campaign.currency) }}
                </td>

                <td>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                    :class="getStatusClass(campaign.status)"
                  >
                    {{ campaign.status }}
                  </span>
                </td>

                <td>
                  <button
                    type="button"
                    class="font-semibold text-blue-600 hover:text-blue-800"
                    @click="$router.push(`/campaigns/${campaign.id}`)"
                  >
                    عرض
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Delete Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 class="text-xl font-bold text-slate-900">تأكيد حذف العميل</h2>

        <p class="mt-3 leading-7 text-slate-500">
          هل أنت متأكد من حذف
          <span class="font-semibold text-slate-900">
            {{ client?.name }}
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
            @click="deleteClient"
          >
            {{ deleting ? "جاري الحذف..." : "نعم، حذف العميل" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
