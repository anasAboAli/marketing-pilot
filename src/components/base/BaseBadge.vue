<script setup>
defineProps({
  color: {
    type: String,
    default: "blue",
  },
});
</script>

<template>

<span
:class="[
'rounded-full px-3 py-1 text-xs font-semibold',

{

'bg-blue-100 text-blue-700':color==='blue',

'bg-green-100 text-green-700':color==='green',

'bg-red-100 text-red-700':color==='red',

'bg-yellow-100 text-yellow-700':color==='yellow',

'bg-purple-100 text-purple-700':color==='purple',

}

]">

<slot/>

</span>

</template>