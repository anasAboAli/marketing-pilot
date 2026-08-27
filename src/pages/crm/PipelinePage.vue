<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import PipelineColumn from "@/components/crm/PipelineColumn.vue";
import leadsService from "@/services/leads.service";

const router = useRouter();

const leads = ref([]);
const loading = ref(true);
const error = ref("");

const searchQuery = ref("");
const selectedSource = ref("");
const selectedAssignee = ref("");

const activeStageId = ref("new");

const updatingLeadId = ref(null);
const successMessage = ref("");

const stages = [
  {
    id: "new",
    name: "جديد",
    status: "جديد",
  },
  {
    id: "contacted",
    name: "تم التواصل",
    status: "تم التواصل",
  },
  {
    id: "qualified",
    name: "مؤهل",
    status: "مؤهل",
  },
  {
    id: "unqualified",
    name: "غير مؤهل",
    status: "غير مؤهل",
  },
];

const sources = computed(() => {
  return [
    ...new Set(
      leads.value
        .map((lead) => lead.source)
        .filter(Boolean)
    ),
  ];
});

const assignees = computed(() => {
  return [
    ...new Set(
      leads.value
        .map((lead) => lead.assignedTo)
        .filter(Boolean)
    ),
  ];
});

const filteredLeads = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return leads.value.filter((lead) => {
    const matchesSearch =
      !query ||
      String(lead.name || "")
        .toLowerCase()
        .includes(query) ||
      String(lead.company || "")
        .toLowerCase()
        .includes(query) ||
      String(lead.phone || "")
        .toLowerCase()
        .includes(query) ||
      String(lead.email || "")
        .toLowerCase()
        .includes(query);

    const matchesSource =
      !selectedSource.value ||
      lead.source === selectedSource.value;

    const matchesAssignee =
      !selectedAssignee.value ||
      lead.assignedTo === selectedAssignee.value;

    return matchesSearch && matchesSource && matchesAssignee;
  });
});

const pipelineStages = computed(() => {
  return stages.map((stage) => {
    const items = filteredLeads.value.filter(
      (lead) => lead.status === stage.status
    );

    return {
      ...stage,
      items,
      total: items.reduce(
        (sum, lead) => sum + Number(lead.value || 0),
        0
      ),
    };
  });
});

const activeStage = computed(() => {
  return (
    pipelineStages.value.find(
      (stage) => stage.id === activeStageId.value
    ) ||
    pipelineStages.value[0]
  );
});

const totalLeads = computed(() => leads.value.length);

const totalValue = computed(() => {
  return leads.value.reduce(
    (sum, lead) => sum + Number(lead.value || 0),
    0
  );
});

const qualifiedLeads = computed(() => {
  return leads.value.filter(
    (lead) => lead.status === "مؤهل"
  ).length;
});

const contactedLeads = computed(() => {
  return leads.value.filter(
    (lead) => lead.status === "تم التواصل"
  ).length;
});

async function loadLeads() {
  loading.value = true;
  error.value = "";

  try {
    leads.value = await leadsService.getAll();
  } catch (err) {
    console.error("Failed to load CRM leads:", err);

    error.value =
      err?.response?.data?.error ||
      "تعذر تحميل بيانات العملاء المحتملين.";
  } finally {
    loading.value = false;
  }
}

function openLead(lead) {
  router.push({
    name: "lead-details",
    params: {
      id: lead.id,
    },
  });
}

function createLead() {
  router.push("/leads");
}

async function changeLeadStatus(leadId, newStatus) {
  const lead = leads.value.find(
    (item) => String(item.id) === String(leadId)
  );

  if (!lead || lead.status === newStatus) {
    return;
  }

  const oldStatus = lead.status;

  updatingLeadId.value = lead.id;
  successMessage.value = "";

  try {
    const updatedLead = await leadsService.update(lead.id, {
      name: lead.name,
      company: lead.company || "",
      phone: lead.phone || "",
      email: lead.email || "",
      source: lead.source || "",
      campaign: lead.campaign || "",
      assignedTo: lead.assignedTo || "",
      value: Number(lead.value || 0),
      status: newStatus,
      notes: lead.notes || "",
    });

    const index = leads.value.findIndex(
      (item) => item.id === lead.id
    );

    if (index !== -1) {
      leads.value[index] = updatedLead;
    }

    successMessage.value =
      `تم نقل ${lead.name || "العميل"} إلى مرحلة "${newStatus}"`;

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  } catch (err) {
    console.error("Failed to update lead status:", err);

    lead.status = oldStatus;

    error.value =
      err?.response?.data?.error ||
      "تعذر تحديث مرحلة العميل.";

    setTimeout(() => {
      error.value = "";
    }, 4000);
  } finally {
    updatingLeadId.value = null;
  }
}

function selectStage(stageId) {
  activeStageId.value = stageId;
}

function handleStageDrop(stage, event) {
  const leadId = event.dataTransfer.getData("text/plain");

  if (!leadId) {
    return;
  }

  changeLeadStatus(leadId, stage.status);
}

function clearFilters() {
  searchQuery.value = "";
  selectedSource.value = "";
  selectedAssignee.value = "";
}

const hasFilters = computed(() => {
  return (
    searchQuery.value ||
    selectedSource.value ||
    selectedAssignee.value
  );
});

onMounted(loadLeads);
</script>

<template>
  <div class="crm-page pb-24 lg:pb-8">

    <!-- ================= Header ================= -->
    <div
      class="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
    >
      <div>
        <p class="mb-1 text-sm font-medium text-slate-500">
          CRM / المبيعات
        </p>

        <h1
          class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          مسار المبيعات
        </h1>

        <p class="mt-2 text-sm text-slate-500">
          تابع العملاء المحتملين وانتقالهم خلال مراحل البيع.
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          @click="createLead"
          class="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:flex-none"
        >
          <span class="text-lg leading-none">+</span>
          إضافة Lead
        </button>

        <button
          type="button"
          @click="loadLeads"
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
      </div>
    </div>

    <!-- ================= Stats ================= -->
    <div
      class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm text-slate-500">
          إجمالي العملاء المحتملين
        </p>

        <p class="mt-2 text-2xl font-bold text-slate-900">
          {{ totalLeads }}
        </p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm text-slate-500">
          إجمالي قيمة الفرص
        </p>

        <p class="mt-2 text-2xl font-bold text-slate-900">
          {{ totalValue.toLocaleString() }}

          <span class="text-sm font-medium text-slate-500">
            ر.س
          </span>
        </p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm text-slate-500">
          العملاء المؤهلون
        </p>

        <p class="mt-2 text-2xl font-bold text-slate-900">
          {{ qualifiedLeads }}
        </p>
      </div>

      <div
        class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <p class="text-sm text-slate-500">
          تم التواصل
        </p>

        <p class="mt-2 text-2xl font-bold text-slate-900">
          {{ contactedLeads }}
        </p>
      </div>
    </div>

    <!-- ================= Search & Filters ================= -->
    <div
      class="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <!-- Search -->
      <div class="relative">
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
          placeholder="ابحث عن اسم، شركة، هاتف أو بريد..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <!-- Source / Assignee -->
      <div class="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <select
          v-model="selectedSource"
          class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">
            كل المصادر
          </option>

          <option
            v-for="source in sources"
            :key="source"
            :value="source"
          >
            {{ source }}
          </option>
        </select>

        <select
          v-model="selectedAssignee"
          class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">
            كل الموظفين
          </option>

          <option
            v-for="assignee in assignees"
            :key="assignee"
            :value="assignee"
          >
            {{ assignee }}
          </option>
        </select>
      </div>

      <!-- Filter status -->
      <div
        v-if="hasFilters"
        class="mt-3 flex flex-wrap items-center justify-between gap-2"
      >
        <p class="text-xs text-slate-400">
          يتم عرض
          <span class="font-semibold text-slate-600">
            {{ filteredLeads.length }}
          </span>
          من أصل
          <span class="font-semibold text-slate-600">
            {{ leads.length }}
          </span>
          عميل محتمل
        </p>

        <button
          type="button"
          @click="clearFilters"
          class="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          مسح الفلاتر
        </button>
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
          class="text-red-500 hover:text-red-700"
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

        جاري تحميل بيانات المبيعات...
      </div>
    </div>

    <!-- ================= Sales Pipeline ================= -->
    <div
      v-else
      class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
    >

      <!-- Stage Tabs -->
      <div
        class="pipeline-tabs-wrapper overflow-x-auto"
      >
        <div
          class="flex min-w-max gap-2 border-b border-slate-100 pb-3"
        >
          <button
            v-for="stage in pipelineStages"
            :key="stage.id"
            type="button"
            @click="selectStage(stage.id)"
            @dragover.prevent
            @drop.prevent="handleStageDrop(stage, $event)"
            class="stage-tab group inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition"
            :class="
              activeStageId === stage.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            "
          >
            <span>
              {{ stage.name }}
            </span>

            <span
              class="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-semibold"
              :class="
                activeStageId === stage.id
                  ? 'bg-white/20 text-white'
                  : 'bg-white text-slate-500 shadow-sm'
              "
            >
              {{ stage.items.length }}
            </span>
          </button>
        </div>
      </div>

      <!-- Active Stage Summary -->
      <div
        class="mt-5 flex flex-col gap-3 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div class="flex items-center gap-2">
            <span class="h-2.5 w-2.5 rounded-full bg-blue-500"></span>

            <h2 class="text-base font-bold text-slate-900">
              {{ activeStage.name }}
            </h2>
          </div>

          <p class="mt-1 text-xs text-slate-500">
            {{ activeStage.items.length }} عميل محتمل
          </p>
        </div>

        <div class="text-sm font-semibold text-slate-600">
          إجمالي قيمة الفرص:
          <span class="text-slate-900">
            {{ Number(activeStage.total || 0).toLocaleString() }}
            ر.س
          </span>
        </div>
      </div>

      <!-- Active Stage Cards -->
      <div class="mt-4">
        <PipelineColumn
          :stage="activeStage"
          :updating-lead-id="updatingLeadId"
          @open-lead="openLead"
          @move-lead="changeLeadStatus"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.crm-page {
  width: 100%;
}

.pipeline-tabs-wrapper {
  scrollbar-width: none;
}

.pipeline-tabs-wrapper::-webkit-scrollbar {
  display: none;
}

.stage-tab {
  user-select: none;
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

@media (max-width: 767px) {
  .crm-page {
    padding-bottom: 90px;
  }
}
</style>