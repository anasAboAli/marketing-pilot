<template>

<BaseDataTable

:headers="[

{key:'number',label:'رقم الفاتورة'},

{key:'amount',label:'المبلغ'},

{key:'status',label:'الحالة'}

]"

:items="[

{

id:1,

number:'#1001',

amount:'15000',

status:'مدفوعة'

}

]"/>

</template>