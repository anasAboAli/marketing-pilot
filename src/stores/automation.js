import { defineStore } from "pinia";

export const useAutomationStore = defineStore("automation",{

state:()=>({

workflows:[

{

id:1,

name:"ترحيب بالعميل الجديد",

trigger:"إضافة عميل",

action:"إرسال بريد",

status:"نشط",

},

{

id:2,

name:"تذكير بالدفع",

trigger:"فاتورة مستحقة",

action:"إرسال رسالة",

status:"نشط",

},

{

id:3,

name:"استبيان رضا العميل",

trigger:"بعد انتهاء المشروع",

action:"إرسال بريد",

status:"متوقف",

}

]

})

});