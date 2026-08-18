import { defineStore } from "pinia";

export const useCampaignBuilderStore = defineStore("campaign-builder",{

state:()=>({

campaign:{

name:"",

objective:"",

platform:"",

budget:0,

startDate:"",

endDate:"",

audiences:[],

creatives:[],

},

step:1,

}),

actions:{

next(){

this.step++;

},

previous(){

this.step--;

},

reset(){

this.step=1;

this.campaign={

name:"",

objective:"",

platform:"",

budget:0,

startDate:"",

endDate:"",

audiences:[],

creatives:[],

};

}

}

});