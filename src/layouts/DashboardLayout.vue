<template>
  <div class="dashboard-shell flex min-h-screen bg-slate-50">
    <AppSidebar />

    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <AppTopbar />
      <AppContent>
        <RouterView />
      </AppContent>
    </div>
    <nav
      class="sidebar fixed inset-x-3 bottom-3 z-20 flex items-center justify-around rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-lg backdrop-blur lg:hidden"
      aria-label="التنقل السريع"
    >
      <RouterLink
        v-for="item in mobileNavigation"
        :key="item.to"
        :to="item.to"
        class="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[11px] font-medium text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
      >
        <span class="text-base">{{ item.icon }}</span>
        <span class="truncate">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";

import AppSidebar from "@/layouts/components/layout/AppSidebar.vue";
import AppTopbar from "@/layouts/components/layout/AppTopbar.vue";
import AppContent from "@/layouts/components/layout/AppContent.vue";

const mobileNavigation = [
  { label: "الرئيسية", to: "/", icon: "⌂" },
  { label: "الحملات", to: "/campaigns", icon: "◈" },
  { label: "العملاء", to: "/clients", icon: "♙" },
  { label: "العملاء المحتملون", to: "/leads", icon: "♙" },
  { label: "المبيعات", to: "/crm/pipeline", icon: "◈" },
  { label: "التحليلات", to: "/analytics", icon: "▥" },
  { label: "التقارير", to: "/reports", icon: "▥" },
  { label: "الفريق", to: "/team", icon: "♙" },
  { label: "الإعدادات", to: "/settings", icon: "⚙" },
];
</script>

<style>

@media (max-width: 700px) {
  .sidebar {
    overflow-x: auto;
    justify-content: flex-start;
  }

  .sidebar a {
    flex: 0 0 auto;
    min-width: 90px;
  }
}
</style>
