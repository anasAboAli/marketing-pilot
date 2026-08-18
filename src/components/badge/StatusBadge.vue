<script setup>

defineProps({

status:String

});

</script>

<template>

<span

class="rounded-full px-3 py-1 text-xs font-semibold"

:class="{

'bg-green-100 text-green-700':status==='نشط',

'bg-red-100 text-red-700':status==='موقوف',

'bg-blue-100 text-blue-700':status==='جديد',

'bg-yellow-100 text-yellow-700':status==='تم التواصل',

'bg-purple-100 text-purple-700':status==='مؤهل',

}"

>

{{ status }}

</span>

</template>