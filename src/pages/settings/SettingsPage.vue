<script setup>
import { ref } from "vue";
const saved = ref(false);
const integrations = ref([
  { name: "Meta Ads", description: "مزامنة الحملات والإعلانات", color: "bg-blue-600", connected: true },
  { name: "Google Ads", description: "استيراد الإنفاق والتحويلات", color: "bg-red-500", connected: false },
  { name: "WhatsApp Business", description: "متابعة محادثات العملاء المحتملين", color: "bg-emerald-500", connected: false },
]);
function save() { saved.value = true; window.setTimeout(() => (saved.value = false), 2500); }
</script>

<template>
  <section class="space-y-6">
    <div><p class="text-sm font-semibold text-blue-600">الإدارة</p><h1 class="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">الإعدادات</h1><p class="mt-2 text-slate-500">إدارة بيانات الوكالة والتكاملات المتصلة.</p></div>
    <div class="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <form class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" @submit.prevent="save">
        <h2 class="mb-6 text-lg font-bold text-slate-900">بيانات الوكالة</h2>
        <div class="grid gap-5 sm:grid-cols-2"><label class="sm:col-span-2"><span class="mb-2 block text-sm font-semibold text-slate-700">اسم الوكالة</span><input class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" value="وكالة النمو الرقمي" /></label><label><span class="mb-2 block text-sm font-semibold text-slate-700">البريد الإلكتروني</span><input type="email" class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" value="info@growth.sa" /></label><label><span class="mb-2 block text-sm font-semibold text-slate-700">رقم الهاتف</span><input class="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" value="0501234567" /></label></div>
        <div class="mt-7 flex items-center gap-3"><button class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">حفظ التعديلات</button><span v-if="saved" class="text-sm font-semibold text-emerald-600">تم الحفظ بنجاح</span></div>
      </form>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><h2 class="mb-5 text-lg font-bold text-slate-900">التكاملات</h2><div class="space-y-3"><div v-for="integration in integrations" :key="integration.name" class="flex items-center gap-3 rounded-xl border border-slate-100 p-3"><span :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white', integration.color]">{{ integration.name.charAt(0) }}</span><div class="min-w-0 flex-1"><p class="font-semibold text-slate-800">{{ integration.name }}</p><p class="truncate text-xs text-slate-500">{{ integration.description }}</p></div><button :class="integration.connected ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'" class="rounded-lg px-3 py-2 text-xs font-semibold" @click="integration.connected = !integration.connected">{{ integration.connected ? 'متصل' : 'ربط' }}</button></div></div><p class="mt-5 text-xs leading-6 text-slate-400">يمكن استبدال هذه الموصلات بمفاتيح API حقيقية من إعدادات الحساب عند ربط الخادم.</p></div>
    </div>
  </section>
</template>
