<script setup>

import { usePaymentsStore } from "@/stores/payments";

const payments=usePaymentsStore();

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

المدفوعات

</h1>

<div class="space-y-4">

<div

v-for="payment in payments.payments"

:key="payment.id"

class="rounded-xl border bg-white p-5">

<h2 class="font-semibold">

{{ payment.client }}

</h2>

<p class="mt-2">

{{ payment.amount }}

</p>

<p class="text-slate-500">

{{ payment.method }}

</p>

</div>

</div>

</div>

</template>