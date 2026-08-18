import { defineStore } from "pinia";

export const useInvoicesStore = defineStore("invoices",{

state:()=>({

invoices:[

{

id:1001,

client:"شركة الريادة",

amount:18000,

status:"مدفوعة",

date:"2026-08-01",

},

{

id:1002,

client:"عيادات النخبة",

amount:9500,

status:"بانتظار الدفع",

date:"2026-08-05",

},

]

})

});