<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseButton from "@/components/base/BaseButton.vue";

const route = useRoute();
const search = ref("");
const searchItems = [
  { label: "لوحة التحكم", to: "/" }, { label: "الحملات", to: "/campaigns" },
  { label: "العملاء", to: "/clients" }, { label: "العملاء المحتملون", to: "/leads" },
  { label: "التقارير", to: "/reports" }, { label: "الفريق", to: "/team" },
];
const results = computed(() => search.value ? searchItems.filter((item) => item.label.includes(search.value)) : []);
const title = computed(() => route.meta.title || "لوحة التحكم");
</script>

<template>
  <header class="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
    <div>
      <p class="text-xs font-medium text-slate-500">MarketingPilot</p>
      <h1 class="text-lg font-bold text-slate-900 sm:text-xl">{{ title }}</h1>
    </div>
    <div class="flex items-center gap-2 sm:gap-3">
      <div class="relative hidden md:block">
        <input v-model="search" class="w-48 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:bg-white lg:w-64" placeholder="ابحث في الموقع..." aria-label="البحث في الموقع" />
        <div v-if="results.length" class="absolute right-0 top-12 z-30 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
          <RouterLink v-for="result in results" :key="result.to" :to="result.to" class="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700" @click="search = ''">{{ result.label }}</RouterLink>
        </div>
      </div>
      <BaseButton variant="ghost" size="sm" aria-label="الانتقال إلى الإشعارات" @click="$router.push('/notifications')">الإشعارات</BaseButton>
      <RouterLink to="/profile" aria-label="فتح الملف الشخصي"><BaseAvatar name="أحمد محمد" /></RouterLink>
    </div>
  </header>
</template>
