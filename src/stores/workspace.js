import { defineStore } from "pinia";

export const useWorkspaceStore = defineStore("workspace",{

state:()=>({

currentWorkspace:null,

workspaces:[

{

id:1,

name:"وكالة النمو الرقمي",

plan:"Business",

members:8,

},

{

id:2,

name:"Growth Agency",

plan:"Starter",

members:3,

}

]

}),

actions:{

select(workspace){

this.currentWorkspace=workspace;

}

}

});