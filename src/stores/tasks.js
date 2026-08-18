import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {

state: () => ({

tasks: [

{

id:1,

title:"إنشاء حملة الصيف",

status:"todo",

assignee:"أحمد محمد",

priority:"عالية",

},

{

id:2,

title:"تصميم إعلان",

status:"progress",

assignee:"سارة خالد",

priority:"متوسطة",

},

{

id:3,

title:"مراجعة التقرير",

status:"done",

assignee:"محمد علي",

priority:"منخفضة",

}

]

}),

actions:{

move(id,status){

const task=this.tasks.find(t=>t.id===id);

if(task){

task.status=status;

}

}

}

});