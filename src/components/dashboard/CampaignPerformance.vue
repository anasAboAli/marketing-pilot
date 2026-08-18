<script setup>
const campaigns = [
  {
    name: "Google Ads",
    progress: 92,
    color: "bg-blue-500",
  },
  {
    name: "Facebook Ads",
    progress: 81,
    color: "bg-indigo-500",
  },
  {
    name: "Instagram Ads",
    progress: 74,
    color: "bg-pink-500",
  },
  {
    name: "TikTok Ads",
    progress: 63,
    color: "bg-black",
  },
];
</script>

<template>
  <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h3 class="text-lg font-semibold">
      Campaign Performance
    </h3>

    <p class="mb-6 text-sm text-slate-500">
      Performance by platform
    </p>

    <div
      v-for="campaign in campaigns"
      :key="campaign.name"
      class="mb-5"
    >
      <div class="mb-2 flex justify-between">
        <span>{{ campaign.name }}</span>

        <span class="font-semibold">
          {{ campaign.progress }}%
        </span>
      </div>

      <div class="h-2 rounded-full bg-slate-100">
        <div
          class="h-full rounded-full"
          :class="campaign.color"
          :style="{ width: campaign.progress + '%' }"
        />
      </div>
    </div>
  </div>
</template>