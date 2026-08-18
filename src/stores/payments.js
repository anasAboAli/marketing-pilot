import { defineStore } from "pinia";

export const usePaymentsStore = defineStore("payments",{

state:()=>({

payments:[

{

id:1,

client:"شركة الريادة",

amount:5000,

method:"تحويل بنكي",

},

{

id:2,

client:"متجر الأناقة",

amount:8200,

method:"بطاقة ائتمانية",

}

]

})

});