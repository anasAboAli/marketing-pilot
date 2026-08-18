<script setup>
import { computed } from "vue";

import {
  HomeIcon,
  MegaphoneIcon,
  UsersIcon,
  UserPlusIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  BriefcaseIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icons = {
  home: HomeIcon,
  megaphone: MegaphoneIcon,
  users: UsersIcon,
  "user-plus": UserPlusIcon,
  chart: ChartBarIcon,
  document: DocumentChartBarIcon,
  briefcase: BriefcaseIcon,
  settings: Cog6ToothIcon,
};

const icon = computed(() => icons[props.name] || HomeIcon);
</script>

<template>
  <component
    :is="icon"
    class="h-5 w-5"
  />
</template>