<script setup>
import { onMounted, ref } from "vue";
import clientsService from "@/services/clients.service";
import { useRouter } from "vue-router";
import campaignsService from "@/services/campaigns.service";

const router = useRouter();

const saving = ref(false);
const error = ref("");
const clients = ref([]);
const loadingClients = ref(false);

const form = ref({
  name: "",
  client_id: "",
  client: "",
  platform: "Google Ads",
  objective: "زيادة المبيعات",
  budget: 0,
  currency: "SAR",
  startDate: "",
  endDate: "",
  description: "",
  status: "نشطة",
});

async function loadClients() {
  try {
    loadingClients.value = true;

    clients.value = await clientsService.getAll();
  } catch (e) {
    error.value = e.response?.data?.error || e.message || "تعذر تحميل العملاء";
  } finally {
    loadingClients.value = false;
  }
}

async function createCampaign() {
  try {
    saving.value = true;
    error.value = "";

    const selectedClient = clients.value.find(
      (client) => client.id === Number(form.value.client_id),
    );

    const data = {
      name: form.value.name,

      client_id: Number(form.value.client_id),

      client: selectedClient?.name || "",

      platform: form.value.platform,
      objective: form.value.objective,
      budget: Number(form.value.budget),
      currency: form.value.currency,
      start_date: form.value.startDate,
      end_date: form.value.endDate,
      description: form.value.description,
      status: form.value.status,

      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
    };

    await campaignsService.create(data);

    // العودة إلى قائمة الحملات
    await router.push("/campaigns");
  } catch (e) {
    error.value = e.response?.data?.error || e.message || "تعذر إنشاء الحملة";
  } finally {
    saving.value = false;
  }
}

function cancel() {
  router.push("/campaigns");
}
onMounted(loadClients);
</script>

<template>
  <div>
    <!-- Header -->

    <div class="mb-8">
      <h1 class="text-3xl font-bold">إنشاء حملة جديدة</h1>

      <p class="mt-2 text-slate-500">أدخل بيانات الحملة الإعلانية.</p>
    </div>

    <!-- Error -->

    <div
      v-if="error"
      class="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
    >
      {{ error }}
    </div>

    <!-- Form -->

    <div
      class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
    >
      <form
        class="grid grid-cols-1 gap-6 md:grid-cols-2"
        @submit.prevent="createCampaign"
      >
        <!-- Campaign Name -->

        <div>
          <label class="mb-2 block font-medium"> اسم الحملة </label>

          <input
            v-model="form.name"
            type="text"
            required
            placeholder="أدخل اسم الحملة"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <!-- Client -->

        <div>
          <label class="mb-2 block font-medium"> العميل </label>

          <select
            v-model="form.client_id"
            required
            :disabled="loadingClients"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600 disabled:cursor-not-allowed disabled:bg-slate-100"
          >
            <option value="" disabled>
              {{ loadingClients ? "جاري تحميل العملاء..." : "اختر العميل" }}
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
          <label class="mb-2 block font-medium"> المنصة الإعلانية </label>

          <select
            v-model="form.platform"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option>Google Ads</option>
            <option>Meta Ads</option>
            <option>TikTok Ads</option>
            <option>Snapchat Ads</option>
          </select>
        </div>

        <!-- Objective -->

        <div>
          <label class="mb-2 block font-medium"> هدف الحملة </label>

          <select
            v-model="form.objective"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option>زيادة المبيعات</option>
            <option>جمع العملاء المحتملين</option>
            <option>زيارات الموقع</option>
            <option>رفع الوعي بالعلامة التجارية</option>
          </select>
        </div>

        <!-- Budget -->

        <div>
          <label class="mb-2 block font-medium"> الميزانية </label>

          <input
            v-model.number="form.budget"
            type="number"
            min="0"
            required
            placeholder="10000"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <!-- Currency -->

        <div>
          <label class="mb-2 block font-medium"> العملة </label>

          <select
            v-model="form.currency"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option value="SAR">ريال سعودي</option>

            <option value="USD">دولار أمريكي</option>
          </select>
        </div>

        <!-- Start Date -->

        <div>
          <label class="mb-2 block font-medium"> تاريخ البداية </label>

          <input
            v-model="form.startDate"
            type="date"
            required
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <!-- End Date -->

        <div>
          <label class="mb-2 block font-medium"> تاريخ النهاية </label>

          <input
            v-model="form.endDate"
            type="date"
            required
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          />
        </div>

        <!-- Status -->

        <div>
          <label class="mb-2 block font-medium"> الحالة </label>

          <select
            v-model="form.status"
            class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          >
            <option>نشطة</option>
            <option>متوقفة</option>
            <option>مكتملة</option>
          </select>
        </div>

        <!-- Description -->

        <div class="md:col-span-2">
          <label class="mb-2 block font-medium"> وصف الحملة </label>

          <textarea
            v-model="form.description"
            rows="5"
            placeholder="اكتب وصفًا مختصرًا للحملة..."
            class="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
          ></textarea>
        </div>

        <!-- Actions -->

        <div
          class="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:justify-end"
        >
          <button
            type="button"
            :disabled="saving"
            class="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-50 disabled:opacity-50"
            @click="cancel"
          >
            إلغاء
          </button>

          <button
            type="submit"
            :disabled="saving"
            class="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ saving ? "جاري الحفظ..." : "حفظ الحملة" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
