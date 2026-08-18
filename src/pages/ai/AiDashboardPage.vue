<script setup>

import BaseStatsCard from "@/components/base/BaseStatsCard.vue";

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

مساعد الذكاء الاصطناعي

</h1>

<div class="grid grid-cols-4 gap-6">

<BaseStatsCard

title="المحتوى"

value="320"

change="+18%"/>

<BaseStatsCard

title="الإعلانات"

value="82"

change="+12%"/>

<BaseStatsCard

title="الكلمات المفتاحية"

value="1200"

change="+9%"/>

<BaseStatsCard

title="رسائل البريد"

value="64"

change="+31%"/>

</div>

</div>

</template>