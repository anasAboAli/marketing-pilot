<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import leadsService from "@/services/leads.service";

const route = useRoute();
const router = useRouter();

const lead = ref(null);

const loading = ref(true);
const saving = ref(false);

const error = ref("");
const success = ref("");

const editing = ref(false);

const deleting = ref(false);
const showDeleteModal = ref(false);

const form = ref({
  name: "",
  company: "",
  phone: "",
  email: "",
  source: "",
  campaign: "",
  assignedTo: "",
  value: 0,
  status: "",
  notes: "",
});

const errors = ref({
  name: "",
  company: "",
  phone: "",
  email: "",
  source: "",
  campaign: "",
  assignedTo: "",
  value: "",
  status: "",
  notes: "",
});

async function loadLead() {
  try {
    loading.value = true;
    error.value = "";

    lead.value = await leadsService.getById(route.params.id);
  } catch (e) {
    error.value = e.response?.data?.error || "تعذر تحميل بيانات العميل المحتمل";
  } finally {
    loading.value = false;
  }
}

function startEditing() {
  if (!lead.value) return;

  form.value = {
    name: lead.value.name || "",
    company: lead.value.company || "",
    phone: lead.value.phone || "",
    email: lead.value.email || "",
    source: lead.value.source || "",
    campaign: lead.value.campaign || "",
    assignedTo: lead.value.assignedTo || "",
    value: Number(lead.value.value) || 0,
    status: lead.value.status || "",
    notes: lead.value.notes || "",
  };

  errors.value = {
    name: "",
    company: "",
    phone: "",
    email: "",
    source: "",
    campaign: "",
    assignedTo: "",
    value: "",
    status: "",
    notes: "",
  };

  error.value = "";
  success.value = "";

  editing.value = true;
}

function cancelEditing() {
  editing.value = false;

  errors.value = {
    name: "",
    company: "",
    phone: "",
    email: "",
    source: "",
    campaign: "",
    assignedTo: "",
    value: "",
    status: "",
    notes: "",
  };
}

function validateForm() {
  errors.value = {
    name: "",
    company: "",
    phone: "",
    email: "",
    source: "",
    campaign: "",
    assignedTo: "",
    value: "",
    status: "",
    notes: "",
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

  if (
    form.value.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
  ) {
    errors.value.email = "البريد الإلكتروني غير صالح";
  }

  if (!form.value.source.trim()) {
    errors.value.source = "مصدر العميل مطلوب";
  }

  if (form.value.value < 0) {
    errors.value.value = "القيمة لا يمكن أن تكون سالبة";
  }

  if (!form.value.status.trim()) {
    errors.value.status = "الحالة مطلوبة";
  }

  return !Object.values(errors.value).some((value) => value);
}

async function updateLead() {
  if (!validateForm()) {
    return;
  }

  try {
    saving.value = true;
    error.value = "";
    success.value = "";

    const updatedLead = await leadsService.update(route.params.id, {
      ...form.value,
      value: Number(form.value.value),
    });

    lead.value = updatedLead;

    editing.value = false;

    success.value = "تم تحديث بيانات العميل المحتمل بنجاح";

    setTimeout(() => {
      success.value = "";
    }, 3000);
  } catch (e) {
    error.value = e.response?.data?.error || "تعذر تحديث بيانات العميل المحتمل";
  } finally {
    saving.value = false;
  }
}

async function deleteLead() {
  if (!lead.value) return;

  try {
    deleting.value = true;
    error.value = "";

    await leadsService.delete(lead.value.id);

    showDeleteModal.value = false;

    // العودة إلى صفحة العملاء المحتملين
    await router.push("/leads");
  } catch (e) {
    error.value =
      e.response?.data?.error ||
      "تعذر حذف العميل المحتمل";
  } finally {
    deleting.value = false;
  }
}

onMounted(loadLead);
</script>

<template>
  <div>
    <!-- Loading -->

    <div
      v-if="loading"
      class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500"
    >
      جاري تحميل بيانات العميل المحتمل...
    </div>

    <!-- Error -->

    <div v-else-if="error" class="rounded-2xl bg-red-50 p-6 text-red-700">
      {{ error }}
    </div>

    <!-- Lead -->

    <div v-else-if="lead">
      <div
        class="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="min-w-0">
          <h1 class="break-words text-2xl font-bold sm:text-3xl">
            {{ lead.name }}
          </h1>

          <p class="mt-2 text-sm text-slate-500 sm:text-base">
            تفاصيل العميل المحتمل
          </p>
        </div>

        <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

  <button
    type="button"
    class="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
    @click="startEditing"
  >
    تعديل البيانات
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

      <!-- رسائل النجاح والخطأ -->

      <div
        v-if="success"
        class="mb-6 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700"
      >
        {{ success }}
      </div>

      <div
        v-if="error"
        class="mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700"
      >
        {{ error }}
      </div>

      <!-- Form التعديل -->

      <!-- EDIT FORM -->
      <div
        v-if="editing"
        class="mb-6 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-6"
      >
        <!-- Form Header -->
        <div class="mb-6">
          <h2 class="text-lg font-semibold text-slate-900 sm:text-xl">
            تعديل بيانات العميل المحتمل
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            قم بتعديل البيانات ثم اضغط على حفظ التعديلات.
          </p>
        </div>

        <form
          class="grid grid-cols-1 gap-4 sm:grid-cols-2"
          @submit.prevent="updateLead"
        >
          <!-- الاسم -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">
              الاسم
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="اسم العميل"
              class="w-full rounded-xl border-2 bg-white px-4 py-3 outline-none transition"
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

          <!-- الشركة -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">
              الشركة
            </label>

            <input
              v-model="form.company"
              type="text"
              placeholder="اسم الشركة"
              class="w-full rounded-xl border-2 bg-white px-4 py-3 outline-none transition"
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

          <!-- رقم الهاتف -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">
              رقم الهاتف
            </label>

            <input
              v-model="form.phone"
              type="tel"
              dir="ltr"
              placeholder="0501234567"
              class="w-full rounded-xl border-2 bg-white px-4 py-3 text-right outline-none transition"
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

          <!-- البريد الإلكتروني -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">
              البريد الإلكتروني
            </label>

            <input
              v-model="form.email"
              type="email"
              dir="ltr"
              placeholder="example@email.com"
              class="w-full rounded-xl border-2 bg-white px-4 py-3 text-right outline-none transition"
              :class="
                errors.email
                  ? 'border-red-500'
                  : 'border-slate-200 focus:border-blue-500'
              "
            />

            <p v-if="errors.email" class="mt-1 text-xs text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- مصدر العميل -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">
              مصدر العميل
            </label>

            <select
              v-model="form.source"
              class="w-full rounded-xl border-2 bg-white px-4 py-3 outline-none transition"
              :class="
                errors.source
                  ? 'border-red-500'
                  : 'border-slate-200 focus:border-blue-500'
              "
            >
              <option value="" disabled>اختر المصدر</option>

              <option value="Google Ads">Google Ads</option>

              <option value="Meta Ads">Meta Ads</option>

              <option value="Instagram">Instagram</option>

              <option value="TikTok">TikTok</option>

              <option value="Website">Website</option>

              <option value="Other">أخرى</option>
            </select>

            <p v-if="errors.source" class="mt-1 text-xs text-red-600">
              {{ errors.source }}
            </p>
          </div>

          <!-- الحملة -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">
              الحملة
            </label>

            <input
              v-model="form.campaign"
              type="text"
              placeholder="اسم الحملة"
              class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <!-- المسؤول -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">
              المسؤول
            </label>

            <input
              v-model="form.assignedTo"
              type="text"
              placeholder="اسم المسؤول"
              class="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <!-- القيمة -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">
              القيمة المتوقعة
            </label>

            <input
              v-model.number="form.value"
              type="number"
              min="0"
              step="0.01"
              dir="ltr"
              placeholder="12000"
              class="w-full rounded-xl border-2 bg-white px-4 py-3 text-right outline-none transition"
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

          <!-- الحالة -->
          <div>
            <label class="mb-2 block text-sm font-medium text-slate-700">
              الحالة
            </label>

            <select
              v-model="form.status"
              class="w-full rounded-xl border-2 bg-white px-4 py-3 outline-none transition"
              :class="
                errors.status
                  ? 'border-red-500'
                  : 'border-slate-200 focus:border-blue-500'
              "
            >
              <option value="جديد">جديد</option>

              <option value="تم التواصل">تم التواصل</option>

              <option value="مؤهل">مؤهل</option>

              <option value="غير مؤهل">غير مؤهل</option>

              <option value="مغلق">مغلق</option>
            </select>

            <p v-if="errors.status" class="mt-1 text-xs text-red-600">
              {{ errors.status }}
            </p>
          </div>

          <!-- الملاحظات -->
          <div class="sm:col-span-2">
            <label class="mb-2 block text-sm font-medium text-slate-700">
              الملاحظات
            </label>

            <textarea
              v-model="form.notes"
              rows="4"
              placeholder="أضف ملاحظات..."
              class="w-full resize-none rounded-xl border-2 border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
            ></textarea>
          </div>

          <!-- الأزرار -->
          <div
            class="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:justify-end"
          >
            <button
              type="button"
              class="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
              @click="cancelEditing"
            >
              إلغاء
            </button>

            <button
              type="submit"
              :disabled="saving"
              class="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {{ saving ? "جاري الحفظ..." : "حفظ التعديلات" }}
            </button>
          </div>
        </form>
      </div>

      <!-- Information -->

      <div class="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:col-span-2"
        >
          <h2 class="mb-6 text-lg font-semibold sm:text-xl">
            معلومات العميل المحتمل
          </h2>

          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            <div>
              <p class="text-sm text-slate-500">الاسم</p>

              <h3 class="mt-1 break-words font-semibold">
                {{ lead.name }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">الشركة</p>

              <h3 class="mt-1 break-words font-semibold">
                {{ lead.company || "غير محدد" }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">رقم الهاتف</p>

              <h3 class="mt-1 font-semibold">
                {{ lead.phone || "غير محدد" }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">البريد الإلكتروني</p>

              <h3 class="mt-1 break-all font-semibold">
                {{ lead.email || "غير محدد" }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">مصدر العميل</p>

              <h3 class="mt-1 break-words font-semibold">
                {{ lead.source }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">الحملة</p>

              <h3 class="mt-1 break-words font-semibold">
                {{ lead.campaign || "غير محدد" }}
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">القيمة المتوقعة</p>

              <h3 class="mt-1 font-semibold">
                {{ Number(lead.value).toLocaleString("ar-SA") }}
                ر.س
              </h3>
            </div>

            <div>
              <p class="text-sm text-slate-500">المسؤول</p>

              <h3 class="mt-1 break-words font-semibold">
                {{ lead.assignedTo || "غير محدد" }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Status -->

        <div
          class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6"
        >
          <h2 class="mb-6 text-lg font-semibold sm:text-xl">حالة العميل</h2>

          <div class="space-y-6">
            <div>
              <p class="text-sm text-slate-500">الحالة الحالية</p>

              <span
                class="mt-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700"
              >
                {{ lead.status }}
              </span>
            </div>

            <div>
              <p class="text-sm text-slate-500">تاريخ الإضافة</p>

              <h3 class="mt-2 text-lg font-semibold">
                {{ new Date(lead.createdAt).toLocaleDateString("ar-SA") }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes -->

      <div
        class="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mt-6 sm:p-6"
      >
        <h2 class="mb-4 text-lg font-semibold sm:text-xl">ملاحظات</h2>

        <p class="break-words leading-8 text-slate-600">
          {{ lead.notes || "لا توجد ملاحظات" }}
        </p>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->

<div
  v-if="showDeleteModal"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
>
  <div
    class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
  >

    <div class="mb-5">
      <h2 class="text-xl font-bold text-slate-900">
        تأكيد حذف العميل
      </h2>

      <p class="mt-2 leading-7 text-slate-500">
        هل أنت متأكد من حذف
        <span class="font-semibold text-slate-900">
          {{ lead?.name }}
        </span>
        ؟
        <br />
        لا يمكن التراجع عن هذه العملية.
      </p>
    </div>


    <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">

      <button
        type="button"
        class="w-full rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
        :disabled="deleting"
        @click="showDeleteModal = false"
      >
        إلغاء
      </button>

      <button
        type="button"
        class="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        :disabled="deleting"
        @click="deleteLead"
      >
        {{ deleting ? "جاري الحذف..." : "نعم، حذف العميل" }}
      </button>

    </div>

  </div>
</div>
  </div>
</template>
