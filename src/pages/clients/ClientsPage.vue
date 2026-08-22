<script setup>
import { onMounted, ref } from "vue";
import clientsService from "@/services/clients.service";
const clients = ref([]);
const showForm = ref(false);

const loading = ref(true);
const creating = ref(false);

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
async function load() {
  try {
    loading.value = true;
    error.value = "";

    clients.value = await clientsService.getAll();
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
onMounted(load);
</script>
<template>
  <section class="space-y-6">
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
        class="cursor-pointer rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        @click="showForm = !showForm"
      >
        + إضافة عميل
      </button>
    </div>
    <form
      id="addClint"
      v-if="showForm"
      class="grid gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:grid-cols-4"
      @submit.prevent="create"
    >
      <input
        v-model="form.name"
        required
        placeholder="اسم العميل"
        class="rounded-xl border-0 px-4 py-3 border border-2 border-black/20 focus:outline-none focus:ring-0"
      /><input
        v-model="form.industry"
        placeholder="القطاع"
        class="rounded-xl border-0 px-4 py-3 border border-2 border-black/20"
      /><input
        v-model="form.manager"
        placeholder="مدير الحساب"
        class="rounded-xl border-0 px-4 py-3 border border-2 border-black/20"
      /><button
        class="cursor-pointer rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
      >
        حفظ العميل
      </button>
    </form>
    <p v-if="error" class="rounded-xl bg-red-50 p-4 text-red-700">
      {{ error }} — شغّل الخادم عبر <code>npm run server</code>
    </p>
    <div
      class="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <table class="w-full min-w-[760px] text-right text-sm">
        <thead class="bg-slate-50 text-slate-500">
          <tr>
            <th class="p-4">اسم العميل</th>
            <th>القطاع</th>
            <th>الحملات</th>
            <th>الإيرادات</th>
            <th>مدير الحساب</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="6" class="p-8 text-center text-slate-500">
              جاري تحميل العملاء...
            </td>
          </tr>
          <tr
            v-for="client in clients"
            v-else
            :key="client.id"
            class="border-t border-slate-100"
          >
            <td class="p-4 font-semibold">{{ client.name }}</td>
            <td>{{ client.industry }}</td>
            <td>{{ client.campaigns }}</td>
            <td>{{ client.revenue }}</td>
            <td>{{ client.manager }}</td>
            <td>
              <span
                class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                >{{ client.status }}</span
              >
            </td>
            <td class="p-4">
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
  </section>
</template>

<style>
#addClint input:focus {
  outline: none;
  border-color: black;
}
</style>
