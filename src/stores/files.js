import { defineStore } from "pinia";

export const useFilesStore=defineStore("files",{

state:()=>({

files:[

{

id:1,

name:"تقرير يوليو.pdf",

size:"1.4 MB",

},

{

id:2,

name:"شعار الشركة.png",

size:"820 KB",

}

]

})

});