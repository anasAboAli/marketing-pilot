import { defineStore } from "pinia";

export const useSocialStore = defineStore("social",{

state:()=>({

posts:[

{

id:1,

title:"إطلاق حملة الصيف",

channel:"Facebook",

status:"مجدول",

date:"2026-08-10",

},

{

id:2,

title:"خصومات أغسطس",

channel:"Instagram",

status:"منشور",

date:"2026-08-06",

},

{

id:3,

title:"إعلان جديد",

channel:"LinkedIn",

status:"مسودة",

date:"2026-08-14",

}

]

})

});