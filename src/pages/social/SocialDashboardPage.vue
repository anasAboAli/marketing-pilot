<script setup>

import { useSocialStore } from "@/stores/social";

const social=useSocialStore();

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

إدارة التواصل الاجتماعي

</h1>

<div class="grid grid-cols-4 gap-6">

<BaseStatsCard

title="المنشورات"

:value="social.posts.length"

change="+18%"/>

<BaseStatsCard

title="المجدولة"

value="12"

change="+6%"/>

<BaseStatsCard

title="التفاعل"

value="48K"

change="+23%"/>

<BaseStatsCard

title="الوصول"

value="320K"

change="+31%"/>

</div>

</div>

</template>