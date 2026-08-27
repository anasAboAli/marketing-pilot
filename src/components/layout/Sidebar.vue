<script setup>
import { navigation } from "@/constants/navigation";

import SidebarItem from "./SidebarItem.vue";
</script>

<template>
  <aside class="flex h-screen w-72 flex-col border-l border-slate-200 bg-white">
    <div class="border-b p-6">
      <h2 class="text-2xl font-bold">وكالة النمو الرقمي</h2>
    </div>

    <nav class="flex-1 space-y-2 p-4">
      <SidebarItem
        v-for="item in navigation"
        :key="item.title"
        :title="item.title"
        :icon="item.icon"
        :to="item.route"
      />
    </nav>
  </aside>
</template>
