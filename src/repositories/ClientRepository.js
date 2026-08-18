import api from "@/api/axios";
import endpoints from "@/api/endpoints";

export default{

all(){

return api.get(endpoints.clients);

},

find(id){

return api.get(`${endpoints.clients}/${id}`);

},

create(data){

return api.post(endpoints.clients,data);

},

update(id,data){

return api.put(`${endpoints.clients}/${id}`,data);

},

delete(id){

return api.delete(`${endpoints.clients}/${id}`);

}

}