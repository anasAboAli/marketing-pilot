import { computed, ref } from "vue";

export function usePagination(data){

const currentPage=ref(1);

const perPage=10;

const totalPages=computed(()=>{

return Math.ceil(data.value.length/perPage);

});

const paginatedData=computed(()=>{

const start=(currentPage.value-1)*perPage;

return data.value.slice(start,start+perPage);

});

return{

currentPage,

totalPages,

paginatedData,

};

}