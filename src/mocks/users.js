import { defineStore } from "pinia";

export const useUsersStore = defineStore("users",{

state:()=>({

users:[],

loading:false,

}),

actions:{

async fetchUsers(){

this.loading=true;

this.users=[

{

id:1,

name:"أحمد محمد",

email:"ahmed@test.com",

role:"مدير",

status:"نشط"

},

{

id:2,

name:"محمد علي",

email:"m@test.com",

role:"مسوق",

status:"نشط"

},

{

id:3,

name:"سارة خالد",

email:"s@test.com",

role:"مصمم",

status:"موقوف"

}

];

this.loading=false;

}

}

});