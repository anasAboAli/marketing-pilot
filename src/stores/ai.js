import { defineStore } from "pinia";

export const useAiStore = defineStore("ai",{

state:()=>({

history:[],

loading:false,

lastPrompt:"",

lastResult:"",

}),

actions:{

async generate(prompt){

this.loading=true;

this.lastPrompt=prompt;

this.lastResult="سيظهر الرد هنا.";

this.history.unshift({

id:Date.now(),

prompt,

result:this.lastResult,

});

this.loading=false;

}

}

});