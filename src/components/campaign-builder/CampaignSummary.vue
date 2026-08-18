<script setup>

defineProps({

campaign:Object,

});

</script>

<template>

<div class="rounded-2xl border bg-white p-6">

<h2 class="mb-6 text-xl font-bold">

ملخص الحملة

</h2>

<div class="space-y-4">

<p>

<strong>الاسم:</strong>

{{ campaign.name }}

</p>

<p>

<strong>المنصة:</strong>

{{ campaign.platform }}

</p>

<p>

<strong>الميزانية:</strong>

{{ campaign.budget }}

</p>

<p>

<strong>تاريخ البداية:</strong>

{{ campaign.startDate }}

</p>

<p>

<strong>تاريخ النهاية:</strong>

{{ campaign.endDate }}

</p>

</div>

</div>

</template>