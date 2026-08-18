import { defineStore } from "pinia";

export const useNotificationsStore=defineStore("notifications",{

state:()=>({

notifications:[

{

id:1,

title:"تم إنشاء حملة جديدة",

time:"قبل 5 دقائق",

read:false,

},

{

id:2,

title:"تم إضافة عميل",

time:"قبل ساعة",

read:false,

}

]

}),

actions:{

markAsRead(id){

const notification=this.notifications.find(n=>n.id===id);

if(notification){

notification.read=true;

}

}

}

});