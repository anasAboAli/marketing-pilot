import { defineStore } from "pinia";

export const usePipelineStore = defineStore("pipeline", {

state: () => ({

stages: [

{

id:1,

name:"عملاء جدد",

items:[

{

id:1,

client:"شركة الريادة",

value:18000,

},

{

id:2,

client:"عيادات النخبة",

value:9000,

}

]

},

{

id:2,

name:"تم التواصل",

items:[

{

id:3,

client:"شركة التقنية",

value:22000,

}

]

},

{

id:3,

name:"عرض سعر",

items:[

{

id:4,

client:"متجر الأناقة",

value:12000,

}

]

},

{

id:4,

name:"تم التعاقد",

items:[

{

id:5,

client:"شركة السفر",

value:31000,

}

]

}

]

})

});