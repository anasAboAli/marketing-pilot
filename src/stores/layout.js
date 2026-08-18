import { defineStore } from "pinia";

export const useLayoutStore = defineStore("layout", {

state: () => ({

sidebar: true,

mobileSidebar: false,

theme: "light",

language: "ar",

}),

actions: {

toggleSidebar() {

this.sidebar = !this.sidebar;

},

toggleMobileSidebar() {

this.mobileSidebar = !this.mobileSidebar;

},

toggleTheme() {

this.theme = this.theme === "light"

? "dark"

: "light";

},

}

});