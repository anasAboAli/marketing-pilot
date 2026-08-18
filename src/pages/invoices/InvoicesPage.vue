<script setup>

import { useInvoicesStore } from "@/stores/invoices";
import { currency } from "@/utils/currency";

const invoices=useInvoicesStore();

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

الفواتير

</h1>

<div class="rounded-2xl border bg-white">

<table class="w-full">

<thead>

<tr>

<th class="p-5 text-right">

رقم الفاتورة

</th>

<th>

العميل

</th>

<th>

المبلغ

</th>

<th>

الحالة

</th>

</tr>

</thead>

<tbody>

<tr

v-for="invoice in invoices.invoices"

:key="invoice.id"

class="border-t">

<td class="p-5">

#{{ invoice.id }}

</td>

<td>

{{ invoice.client }}

</td>

<td>

{{ currency(invoice.amount) }}

</td>

<td>

{{ invoice.status }}

</td>

</tr>

</tbody>

</table>

</div>

</div>

</template>