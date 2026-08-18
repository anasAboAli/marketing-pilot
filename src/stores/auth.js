import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {

    state:()=>({

        user: JSON.parse(localStorage.getItem("user") || "null"),
        
        token:null,
                   
        isAuthenticated: Boolean(localStorage.getItem("token")),
    
        loading:false,

    }),

    actions:{

        login(user,token){

            this.user=user;

            this.token=token;

            this.isAuthenticated=true;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);

        },

        logout(){

            this.user=null;

            this.token=null;

            this.isAuthenticated=false;
            localStorage.removeItem("user");
            localStorage.removeItem("token");

        }

    }

});
