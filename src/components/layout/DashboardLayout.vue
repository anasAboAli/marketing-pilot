<script setup>

import Sidebar from "@/components/layout/Sidebar.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

</script>

<template>

<div class="flex min-h-screen bg-slate-100">

<Sidebar/>

<div class="flex flex-1 flex-col">

<Header/>

<main class="flex-1 p-8">

<RouterView/>

</main>

<Footer/>

</div>

</div>

</template>