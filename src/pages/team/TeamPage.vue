<script setup>
import { computed, onMounted, ref } from "vue";
import teamService from "@/services/team.service";

const members = ref([]);

const loading = ref(true);
const saving = ref(false);
const error = ref("");
const successMessage = ref("");

const searchQuery = ref("");
const selectedStatus = ref("");

const showModal = ref(false);
const editingMember = ref(null);

const form = ref({
  name: "",
  role: "",
  email: "",
  phone: "",
  status: "نشط",
});

const filteredMembers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return members.value.filter((member) => {
    const matchesSearch =
      !query ||
      String(member.name || "")
        .toLowerCase()
        .includes(query) ||
      String(member.role || "")
        .toLowerCase()
        .includes(query) ||
      String(member.email || "")
        .toLowerCase()
        .includes(query) ||
      String(member.phone || "")
        .toLowerCase()
        .includes(query);

    const matchesStatus =
      !selectedStatus.value ||
      member.status === selectedStatus.value;

    return matchesSearch && matchesStatus;
  });
});

const totalMembers = computed(() => members.value.length);

const activeMembers = computed(() => {
  return members.value.filter(
    (member) => member.status === "نشط"
  ).length;
});

const inactiveMembers = computed(() => {
  return members.value.filter(
    (member) => member.status === "غير نشط"
  ).length;
});

async function loadMembers() {
  loading.value = true;
  error.value = "";

  try {
    members.value = await teamService.getAll();
  } catch (err) {
    console.error("Failed to load team members:", err);

    error.value =
      err?.response?.data?.error ||
      "تعذر تحميل أعضاء الفريق.";
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  form.value = {
    name: "",
    role: "",
    email: "",
    phone: "",
    status: "نشط",
  };
}

function openCreateModal() {
  editingMember.value = null;
  resetForm();
  error.value = "";
  showModal.value = true;
}

function openEditModal(member) {
  editingMember.value = member;

  form.value = {
    name: member.name || "",
    role: member.role || "",
    email: member.email || "",
    phone: member.phone || "",
    status: member.status || "نشط",
  };

  error.value = "";
  showModal.value = true;
}

function closeModal() {
  if (saving.value) {
    return;
  }

  showModal.value = false;
  editingMember.value = null;
  resetForm();
}

async function saveMember() {
  if (!form.value.name.trim()) {
    error.value = "يرجى إدخال اسم العضو.";
    return;
  }

  if (!form.value.role.trim()) {
    error.value = "يرجى إدخال المسمى الوظيفي.";
    return;
  }

  saving.value = true;
  error.value = "";

  try {
    let savedMember;

    if (editingMember.value) {
      savedMember = await teamService.update(
        editingMember.value.id,
        form.value
      );

      const index = members.value.findIndex(
        (member) => member.id === editingMember.value.id
      );

      if (index !== -1) {
        members.value[index] = savedMember;
      }

      successMessage.value = "تم تحديث بيانات العضو بنجاح.";
    } else {
      savedMember = await teamService.create(form.value);

      members.value.unshift(savedMember);

      successMessage.value = "تمت إضافة عضو الفريق بنجاح.";
    }

    showModal.value = false;
    editingMember.value = null;
    resetForm();

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (err) {
    console.error("Failed to save team member:", err);

    error.value =
      err?.response?.data?.error ||
      "تعذر حفظ بيانات العضو.";
  } finally {
    saving.value = false;
  }
}

async function deleteMember(member) {
  const confirmed = window.confirm(
    `هل أنت متأكد من حذف العضو "${member.name}"؟`
  );

  if (!confirmed) {
    return;
  }

  error.value = "";

  try {
    await teamService.delete(member.id);

    members.value = members.value.filter(
      (item) => item.id !== member.id
    );

    successMessage.value = "تم حذف العضو بنجاح.";

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (err) {
    console.error("Failed to delete team member:", err);

    error.value =
      err?.response?.data?.error ||
      "تعذر حذف العضو.";
  }
}

function getInitial(name) {
  return String(name || "؟").trim().charAt(0) || "؟";
}

function clearFilters() {
  searchQuery.value = "";
  selectedStatus.value = "";
}

const hasFilters = computed(() => {
  return searchQuery.value || selectedStatus.value;
});

onMounted(loadMembers);
</script>

<template>
  <div class="team-page pb-24 lg:pb-8">

    <!-- ================= Header ================= -->

    <div
      class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <p class="mb-1 text-sm font-medium text-slate-500">
          إدارة الفريق
        </p>

        <h1
          class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          الفريق
        </h1>

        <p class="mt-2 text-sm text-slate-500">
          إدارة أعضاء الفريق وبياناتهم وحالاتهم.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          @click="loadMembers"
          :disabled="loading"
          class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
        >
          <svg
            class="h-4 w-4"
            :class="{ 'animate-spin': loading }"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <path
              d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          تحديث
        </button>

        <button
          type="button"
          @click="openCreateModal"
          class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:flex-none"
        >
          <span class="text-lg leading-none">+</span>
          إضافة عضو
        </button>
      </div>
    </div>

    <!-- ================= Stats ================= -->

    <div
      class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm text-slate-500">
          إجمالي أعضاء الفريق
        </p>

        <p class="mt-2 text-2xl font-bold text-slate-900">
          {{ totalMembers }}
        </p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm text-slate-500">
          أعضاء نشطون
        </p>

        <p class="mt-2 text-2xl font-bold text-emerald-600">
          {{ activeMembers }}
        </p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm text-slate-500">
          أعضاء غير نشطين
        </p>

        <p class="mt-2 text-2xl font-bold text-slate-500">
          {{ inactiveMembers }}
        </p>
      </div>
    </div>

    <!-- ================= Filters ================= -->

    <div
      class="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-center"
      >

        <!-- Search -->

        <div class="relative min-w-0 flex-1">
          <svg
            class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
            />

            <path
              d="m20 20-4-4"
              stroke-linecap="round"
            />
          </svg>

          <input
            v-model="searchQuery"
            type="search"
            placeholder="ابحث عن اسم، وظيفة، بريد أو هاتف..."
            class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <!-- Status -->

        <select
          v-model="selectedStatus"
          class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-44"
        >
          <option value="">
            كل الحالات
          </option>

          <option value="نشط">
            نشط
          </option>

          <option value="غير نشط">
            غير نشط
          </option>
        </select>

        <!-- Clear -->

        <button
          v-if="hasFilters"
          type="button"
          @click="clearFilters"
          class="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          مسح
        </button>
      </div>

      <div
        v-if="hasFilters"
        class="mt-3 text-xs text-slate-400"
      >
        يتم عرض
        <span class="font-semibold text-slate-600">
          {{ filteredMembers.length }}
        </span>
        من أصل
        <span class="font-semibold text-slate-600">
          {{ members.length }}
        </span>
        عضو
      </div>
    </div>

    <!-- ================= Notifications ================= -->

    <Transition name="notification">
      <div
        v-if="successMessage"
        class="mb-4 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
      >
        <span
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100"
        >
          ✓
        </span>

        {{ successMessage }}
      </div>
    </Transition>

    <Transition name="notification">
      <div
        v-if="error"
        class="mb-4 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
      >
        <span>
          {{ error }}
        </span>

        <button
          type="button"
          @click="error = ''"
          class="shrink-0 text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
    </Transition>

    <!-- ================= Loading ================= -->

    <div
      v-if="loading"
      class="flex min-h-[420px] items-center justify-center rounded-2xl border border-slate-200 bg-white"
    >
      <div class="flex items-center gap-3 text-sm text-slate-500">
        <div
          class="h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600"
        ></div>

        جاري تحميل أعضاء الفريق...
      </div>
    </div>

    <!-- ================= Empty ================= -->

    <div
      v-else-if="filteredMembers.length === 0"
      class="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm"
    >
      <div
        class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl"
      >
        👥
      </div>

      <h2 class="mt-4 text-lg font-bold text-slate-900">
        لا يوجد أعضاء
      </h2>

      <p class="mt-2 text-sm text-slate-500">
        {{
          hasFilters
            ? "لم نجد أعضاء مطابقين للفلاتر الحالية."
            : "ابدأ بإضافة أول عضو إلى فريقك."
        }}
      </p>

      <button
        v-if="!hasFilters"
        type="button"
        @click="openCreateModal"
        class="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        + إضافة أول عضو
      </button>
    </div>

    <!-- ================= Members ================= -->

    <div
      v-else
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      <article
        v-for="member in filteredMembers"
        :key="member.id"
        class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
      >

        <!-- Top -->

        <div class="p-5">

          <div
            class="flex items-start justify-between gap-3"
          >
            <div
              class="flex min-w-0 items-center gap-3"
            >
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white"
              >
                {{ getInitial(member.name) }}
              </div>

              <div class="min-w-0">
                <h2
                  class="truncate text-base font-bold text-slate-900"
                  :title="member.name"
                >
                  {{ member.name }}
                </h2>

                <p
                  class="mt-1 truncate text-sm text-slate-500"
                  :title="member.role"
                >
                  {{ member.role }}
                </p>
              </div>
            </div>

            <span
              class="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold"
              :class="
                member.status === 'نشط'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-100 text-slate-500'
              "
            >
              {{ member.status }}
            </span>
          </div>

          <!-- Contact -->

          <div class="mt-5 space-y-2.5">

            <div
              v-if="member.email"
              class="flex min-w-0 items-center gap-2 text-sm text-slate-500"
            >
              <span
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-xs"
              >
                @
              </span>

              <span
                class="truncate"
                :title="member.email"
              >
                {{ member.email }}
              </span>
            </div>

            <div
              v-if="member.phone"
              class="flex min-w-0 items-center gap-2 text-sm text-slate-500"
            >
              <span
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-xs"
              >
                ☎
              </span>

              <span
                class="truncate"
                :title="member.phone"
              >
                {{ member.phone }}
              </span>
            </div>

            <div
              v-if="!member.email && !member.phone"
              class="text-xs text-slate-400"
            >
              لا توجد بيانات تواصل
            </div>

          </div>
        </div>

        <!-- Footer -->

        <div
          class="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-3"
        >
          <span class="text-xs text-slate-400">
            عضو #{{ member.id }}
          </span>

          <div class="flex items-center gap-1">

            <button
              type="button"
              @click="openEditModal(member)"
              class="rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
            >
              تعديل
            </button>

            <button
              type="button"
              @click="deleteMember(member)"
              class="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
            >
              حذف
            </button>

          </div>
        </div>
      </article>
    </div>

    <!-- ================= Modal ================= -->

    <Transition name="modal">

      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
        @click.self="closeModal"
      >

        <div
          class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          dir="rtl"
        >

          <!-- Modal Header -->

          <div
            class="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6"
          >
            <div>
              <h2 class="text-lg font-bold text-slate-900">
                {{
                  editingMember
                    ? "تعديل عضو"
                    : "إضافة عضو جديد"
                }}
              </h2>

              <p class="mt-1 text-xs text-slate-500">
                {{
                  editingMember
                    ? "قم بتعديل بيانات عضو الفريق."
                    : "أدخل بيانات العضو الجديد."
                }}
              </p>
            </div>

            <button
              type="button"
              @click="closeModal"
              :disabled="saving"
              class="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
            >
              ×
            </button>
          </div>

          <!-- Modal Body -->

          <form
            @submit.prevent="saveMember"
            class="p-5 sm:p-6"
          >

            <div class="space-y-4">

              <!-- Name -->

              <div>
                <label
                  class="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  الاسم
                  <span class="text-red-500">*</span>
                </label>

                <input
                  v-model="form.name"
                  type="text"
                  placeholder="مثال: أحمد محمد"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <!-- Role -->

              <div>
                <label
                  class="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  المسمى الوظيفي
                  <span class="text-red-500">*</span>
                </label>

                <input
                  v-model="form.role"
                  type="text"
                  placeholder="مثال: مدير الحسابات"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <!-- Email + Phone -->

              <div
                class="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >

                <div>
                  <label
                    class="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    البريد الإلكتروني
                  </label>

                  <input
                    v-model="form.email"
                    type="email"
                    dir="ltr"
                    placeholder="name@example.com"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    class="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    رقم الهاتف
                  </label>

                  <input
                    v-model="form.phone"
                    type="tel"
                    dir="ltr"
                    placeholder="+970..."
                    class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              <!-- Status -->

              <div>
                <label
                  class="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  الحالة
                </label>

                <select
                  v-model="form.status"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  <option value="نشط">
                    نشط
                  </option>

                  <option value="غير نشط">
                    غير نشط
                  </option>
                </select>
              </div>

            </div>

            <!-- Form Error -->

            <div
              v-if="error"
              class="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {{ error }}
            </div>

            <!-- Actions -->

            <div
              class="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
            >
              <button
                type="button"
                @click="closeModal"
                :disabled="saving"
                class="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                إلغاء
              </button>

              <button
                type="submit"
                :disabled="saving"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <div
                  v-if="saving"
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                ></div>

                {{
                  saving
                    ? "جاري الحفظ..."
                    : editingMember
                      ? "حفظ التعديلات"
                      : "إضافة العضو"
                }}
              </button>
            </div>

          </form>
        </div>
      </div>

    </Transition>

  </div>
</template>

<style scoped>
.team-page {
  width: 100%;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.2s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: translateY(10px) scale(0.98);
}

@media (max-width: 640px) {
  .team-page {
    padding-bottom: 90px;
  }
}
</style>