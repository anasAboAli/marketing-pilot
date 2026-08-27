<script setup>
import { computed, onMounted, ref } from "vue";
import settingsService from "@/services/settings.service";

const loading = ref(true);
const saving = ref(false);

const error = ref("");
const success = ref("");

const form = ref({
  agencyName: "",
  email: "",
  phone: "",
  currency: "SAR",
  timezone: "Asia/Riyadh",
  notifyLeads: true,
  notifyCampaigns: true,
  notifyTeam: true,
});

const integrations = [
  {
    name: "Meta Ads",
    description: "مزامنة الحملات والإعلانات",
    color: "bg-blue-600",
  },
  {
    name: "Google Ads",
    description: "استيراد الإنفاق والتحويلات",
    color: "bg-red-500",
  },
  {
    name: "WhatsApp Business",
    description: "متابعة محادثات العملاء",
    color: "bg-emerald-500",
  },
];

const hasAgencyData = computed(() => {
  return (
    form.value.agencyName ||
    form.value.email ||
    form.value.phone
  );
});

async function loadSettings() {
  loading.value = true;
  error.value = "";

  try {
    const settings = await settingsService.get();

    form.value = {
      agencyName: settings.agencyName || "",
      email: settings.email || "",
      phone: settings.phone || "",
      currency: settings.currency || "SAR",
      timezone: settings.timezone || "Asia/Riyadh",
      notifyLeads: Boolean(settings.notifyLeads),
      notifyCampaigns: Boolean(settings.notifyCampaigns),
      notifyTeam: Boolean(settings.notifyTeam),
    };
  } catch (err) {
    console.error("Failed to load settings:", err);

    error.value =
      err?.response?.data?.error ||
      "تعذر تحميل الإعدادات.";
  } finally {
    loading.value = false;
  }
}

async function saveSettings() {
  saving.value = true;
  error.value = "";
  success.value = "";

  try {
    const updated = await settingsService.update({
      ...form.value,
    });

    form.value = {
      agencyName: updated.agencyName || "",
      email: updated.email || "",
      phone: updated.phone || "",
      currency: updated.currency || "SAR",
      timezone: updated.timezone || "Asia/Riyadh",
      notifyLeads: Boolean(updated.notifyLeads),
      notifyCampaigns: Boolean(updated.notifyCampaigns),
      notifyTeam: Boolean(updated.notifyTeam),
    };

    success.value = "تم حفظ الإعدادات بنجاح.";

    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (err) {
    console.error("Failed to save settings:", err);

    error.value =
      err?.response?.data?.error ||
      "تعذر حفظ الإعدادات.";
  } finally {
    saving.value = false;
  }
}

onMounted(loadSettings);
</script>

<template>
  <section class="space-y-6 pb-24 lg:pb-8">

    <!-- Header -->
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p class="text-sm font-semibold text-blue-600">
          الإعدادات
        </p>

        <h1 class="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          إعدادات النظام
        </h1>

        <p class="mt-2 text-sm text-slate-500 sm:text-base">
          إدارة بيانات الوكالة والتنبيهات والتكاملات.
        </p>
      </div>

      <button
        type="button"
        @click="loadSettings"
        :disabled="loading"
        class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
      >
        تحديث
      </button>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div class="flex items-center gap-3 text-sm text-slate-500">
        <div
          class="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
        ></div>

        جاري تحميل الإعدادات...
      </div>
    </div>

    <template v-else>

      <!-- Messages -->

      <div
        v-if="success"
        class="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
      >
        {{ success }}
      </div>

      <div
        v-if="error"
        class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
      >
        {{ error }}
      </div>

      <!-- Agency -->
      <form
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        @submit.prevent="saveSettings"
      >
        <div class="mb-6">
          <h2 class="text-lg font-bold text-slate-900">
            بيانات الوكالة
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            هذه البيانات يتم حفظها في قاعدة البيانات.
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">

          <label class="sm:col-span-2">
            <span class="mb-2 block text-sm font-semibold text-slate-700">
              اسم الوكالة
            </span>

            <input
              v-model="form.agencyName"
              type="text"
              placeholder="مثال: MarketPilot"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label>
            <span class="mb-2 block text-sm font-semibold text-slate-700">
              البريد الإلكتروني
            </span>

            <input
              v-model="form.email"
              type="email"
              dir="ltr"
              placeholder="info@example.com"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label>
            <span class="mb-2 block text-sm font-semibold text-slate-700">
              رقم الهاتف
            </span>

            <input
              v-model="form.phone"
              type="tel"
              dir="ltr"
              placeholder="+970..."
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label>
            <span class="mb-2 block text-sm font-semibold text-slate-700">
              العملة
            </span>

            <select
              v-model="form.currency"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="SAR">
                ريال سعودي
              </option>

              <option value="USD">
                دولار أمريكي
              </option>

              <option value="EUR">
                يورو
              </option>
            </select>
          </label>

          <label>
            <span class="mb-2 block text-sm font-semibold text-slate-700">
              المنطقة الزمنية
            </span>

            <select
              v-model="form.timezone"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option value="Asia/Riyadh">
                الرياض
              </option>

              <option value="Asia/Gaza">
                غزة
              </option>

              <option value="Asia/Dubai">
                دبي
              </option>
            </select>
          </label>
        </div>

        <div
          class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="text-xs text-slate-400">
            {{
              hasAgencyData
                ? "آخر البيانات المحفوظة موجودة في قاعدة البيانات."
                : "أدخل بيانات الوكالة ثم احفظها."
            }}
          </p>

          <button
            type="submit"
            :disabled="saving"
            class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ saving ? "جاري الحفظ..." : "حفظ التعديلات" }}
          </button>
        </div>
      </form>

      <!-- Notifications -->
      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <div class="mb-6">
          <h2 class="text-lg font-bold text-slate-900">
            الإشعارات
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            تحكم في أنواع التنبيهات التي تريد تفعيلها.
          </p>
        </div>

        <div class="space-y-3">

          <label
            class="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
          >
            <div>
              <p class="font-semibold text-slate-800">
                إشعارات العملاء المحتملين
              </p>

              <p class="mt-1 text-xs text-slate-500">
                التنبيه عند إضافة أو تحديث Lead.
              </p>
            </div>

            <input
              v-model="form.notifyLeads"
              type="checkbox"
              class="h-5 w-5 accent-blue-600"
            />
          </label>

          <label
            class="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
          >
            <div>
              <p class="font-semibold text-slate-800">
                إشعارات الحملات
              </p>

              <p class="mt-1 text-xs text-slate-500">
                التنبيه عند تحديث بيانات الحملات.
              </p>
            </div>

            <input
              v-model="form.notifyCampaigns"
              type="checkbox"
              class="h-5 w-5 accent-blue-600"
            />
          </label>

          <label
            class="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
          >
            <div>
              <p class="font-semibold text-slate-800">
                إشعارات الفريق
              </p>

              <p class="mt-1 text-xs text-slate-500">
                التنبيه عند إضافة أو تعديل عضو في الفريق.
              </p>
            </div>

            <input
              v-model="form.notifyTeam"
              type="checkbox"
              class="h-5 w-5 accent-blue-600"
            />
          </label>

        </div>
      </div>

      <!-- Integrations -->
      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <div class="mb-6">
          <h2 class="text-lg font-bold text-slate-900">
            التكاملات
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            خدمات يمكن ربطها مستقبلًا بمشروع MarketPilot.
          </p>
        </div>

        <div class="grid gap-3 lg:grid-cols-3">

          <div
            v-for="integration in integrations"
            :key="integration.name"
            class="rounded-xl border border-slate-100 p-4"
          >
            <div class="flex items-center gap-3">

              <span
                :class="[
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white',
                  integration.color,
                ]"
              >
                {{ integration.name.charAt(0) }}
              </span>

              <div class="min-w-0">
                <p class="font-semibold text-slate-800">
                  {{ integration.name }}
                </p>

                <p class="mt-1 text-xs text-slate-500">
                  {{ integration.description }}
                </p>
              </div>
            </div>

            <div
              class="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
            >
              <span class="text-xs font-medium text-slate-500">
                الحالة
              </span>

              <span
                class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500"
              >
                غير متصل
              </span>
            </div>

          </div>

        </div>

        <p class="mt-5 text-xs leading-6 text-slate-400">
          التكاملات الحالية عبارة عن واجهة فقط، ولن يتم اعتبار أي خدمة متصلة
          قبل إضافة التكامل الحقيقي وعمليات المصادقة الخاصة بها.
        </p>
      </div>

    </template>
  </section>
</template>

<style scoped>
.team-page {
  width: 100%;
}

@media (max-width: 640px) {
  section {
    padding-bottom: 90px;
  }
}
</style>