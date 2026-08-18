import api from "@/api/axios";
import endpoints from "@/api/endpoints";

export default{

all(){

return api.get(endpoints.leads);

},

find(id){

return api.get(`${endpoints.leads}/${id}`);

},

create(data){

return api.post(endpoints.leads,data);

},

update(id,data){

return api.put(`${endpoints.leads}/${id}`,data);

},

delete(id){

return api.delete(`${endpoints.leads}/${id}`);

}

}