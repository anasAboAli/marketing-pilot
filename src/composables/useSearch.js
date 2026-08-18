import { computed, ref } from "vue";

export function useSearch(data){

const search=ref("");

const filtered=computed(()=>{

return data.value.filter(item=>

JSON.stringify(item)

.toLowerCase()

.includes(search.value.toLowerCase())

);

});

return{

search,

filtered,

};

}