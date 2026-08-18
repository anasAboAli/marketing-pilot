<script setup>

import {useLayoutStore} from "@/stores/layout";

const layout=useLayoutStore();

</script>

<template>

<button

@click="layout.toggleTheme()"

class="rounded-xl border px-4 py-2">

{{ layout.theme==="light"

?"🌞"

:"🌙" }}

</button>

</template>