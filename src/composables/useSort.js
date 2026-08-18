import { ref } from "vue";

export function useSort(){

const sortBy=ref("");

const direction=ref("asc");

function toggle(column){

if(sortBy.value===column){

direction.value=direction.value==="asc"

?"desc"

:"asc";

}else{

sortBy.value=column;

direction.value="asc";

}

}

return{

sortBy,

direction,

toggle,

};

}