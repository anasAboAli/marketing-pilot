<template>

<BaseDataTable

:headers="[

{key:'name',label:'الحملة'},

{key:'platform',label:'المنصة'},

{key:'budget',label:'الميزانية'},

{key:'status',label:'الحالة'}

]"

:items="[

{

id:1,

name:'حملة الصيف',

platform:'Google Ads',

budget:'15000',

status:'نشطة'

}

]"/>

</template>