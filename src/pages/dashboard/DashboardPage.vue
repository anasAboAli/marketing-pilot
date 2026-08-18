<script setup>

import RevenueOverview from "@/components/dashboard/RevenueOverview.vue";
import RevenueChart from "@/components/dashboard/RevenueChart.vue";
import MonthlyTarget from "@/components/dashboard/MonthlyTarget.vue";
import SalesStatistics from "@/components/dashboard/SalesStatistics.vue";
import TopCampaigns from "@/components/dashboard/TopCampaigns.vue";
import TopEmployees from "@/components/dashboard/TopEmployees.vue";
import RecentLeads from "@/components/dashboard/RecentLeads.vue";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline.vue";
import CalendarWidget from "@/components/dashboard/CalendarWidget.vue";

</script>

<template>

<div class="space-y-8">

<RevenueOverview/>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">

<div class="lg:col-span-2">

<RevenueChart/>

</div>

<MonthlyTarget/>

</div>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">

<SalesStatistics/>

<TopEmployees/>

</div>

<TopCampaigns/>

<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">

<RecentLeads/>

<ActivityTimeline/>

</div>

<CalendarWidget/>

</div>

</template>
