<script setup>

const posts=[

{

title:"إطلاق منتج",

channel:"Facebook",

status:"منشور",

},

{

title:"عرض خاص",

channel:"Instagram",

status:"مجدول",

},

{

title:"خصم الصيف",

channel:"TikTok",

status:"مسودة",

},

];

</script>

<template>

<div>

<h1 class="mb-8 text-3xl font-bold">

المنشورات

</h1>

<BaseDataTable

:headers="[

{key:'title',label:'العنوان'},

{key:'channel',label:'القناة'},

{key:'status',label:'الحالة'}

]"

:items="posts">

</BaseDataTable>

</div>

</template>