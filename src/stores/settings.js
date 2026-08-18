import { defineStore } from "pinia";

export const useSettingsStore=defineStore("settings",{

state:()=>({

theme:"light",

language:"ar",

sidebar:true,

}),

actions:{

toggleSidebar(){

this.sidebar=!this.sidebar;

},

toggleTheme(){

this.theme=this.theme==="light"?"dark":"light";

}

}

});