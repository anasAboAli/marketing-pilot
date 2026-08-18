<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import authService from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth";

const router=useRouter();

const auth=useAuthStore();

const email=ref("");

const password=ref("");

async function login(){

    const response=await authService.login({ email: email.value, password: password.value });

    auth.login(response.user,response.token);

    router.push("/");

}
</script>

<template>

<div class="flex min-h-screen items-center justify-center bg-slate-100">

<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow">

<h1 class="mb-8 text-center text-3xl font-bold">

تسجيل الدخول

</h1>

<div class="mb-5">

<label class="mb-2 block">

البريد الإلكتروني

</label>

<input
v-model="email"
type="email"
class="w-full rounded-xl border px-4 py-3">

</div>

<div class="mb-8">

<label class="mb-2 block">

كلمة المرور

</label>

<input
v-model="password"
type="password"
class="w-full rounded-xl border px-4 py-3">

</div>

<button
@click="login"
class="w-full rounded-xl bg-blue-600 py-3 text-white">

دخول

</button>

<RouterLink
to="/forgot-password"
class="mt-5 block text-center text-blue-600">

نسيت كلمة المرور؟

</RouterLink>

</div>

</div>

</template>
