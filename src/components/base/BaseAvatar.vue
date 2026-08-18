<script setup>
defineProps({
  name: String,
});
</script>

<template>

<div
class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">

{{ name.charAt(0) }}

</div>

</template>