<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppIcon from "@/components/common/AppIcon.vue";

const route = useRoute();
const navigation = [
  { label: "لوحة التحكم", to: "/", icon: "home" },
  { label: "الحملات", to: "/campaigns", icon: "megaphone" },
  { label: "العملاء", to: "/clients", icon: "users" },
  { label: "العملاء المحتملون", to: "/leads", icon: "user-plus" },
  { label: "المبيعات وCRM", to: "/crm/pipeline", icon: "briefcase" },
  { label: "التحليلات", to: "/analytics", icon: "chart" },
  { label: "التقارير", to: "/reports", icon: "document" },
  { label: "الفريق", to: "/team", icon: "users" },
  { label: "الإعدادات", to: "/settings", icon: "settings" },
];

const activePath = computed(() => route.path);
</script>

<template>
  <aside
    class="hidden h-screen w-[280px] shrink-0 border-l border-slate-200 bg-white lg:block"
  >
    <div class="flex h-[72px] items-center border-b border-slate-200 px-6">
      <RouterLink
        to="/"
        class="flex items-center gap-3"
        aria-label="MarketingPilot - لوحة التحكم"
      >
        <span
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white"
          >M</span
        >
        <span class="text-lg font-bold tracking-tight text-slate-900"
          >MarketingPilot</span
        >
      </RouterLink>
    </div>
    <nav class="space-y-1 p-4" aria-label="التنقل الرئيسي">
      <RouterLink
        v-for="item in navigation"
        :key="item.to"
        :to="item.to"
        :class="[
          'flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition',
          activePath === item.to
            ? 'bg-blue-50 text-blue-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
        ]"
      >
        <AppIcon :name="item.icon" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
    <div class="absolute bottom-0 w-[280px] border-t border-slate-200 p-4">
      <RouterLink
        to="/workspace"
        class="flex items-center gap-3 rounded-xl bg-slate-50 p-3 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-white font-semibold text-blue-600 shadow-sm"
          >W</span
        >
        <span class="min-w-0"
          ><span class="block truncate font-semibold text-slate-800"
            >وكالة النمو الرقمي</span
          ><span class="block text-xs">خطة Business</span></span
        >
      </RouterLink>
    </div>
  </aside>
</template>
