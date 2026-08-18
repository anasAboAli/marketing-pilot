import {defineStore} from "pinia";

export const useRolesStore=defineStore("roles",{

state:()=>({

roles:[

"مدير",

"مسوق",

"مصمم",

"كاتب محتوى",

"محاسب",

]

})

});