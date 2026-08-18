import api from "@/api/axios";
import endpoints from "@/api/endpoints";

export default{

all(){

return api.get(endpoints.users);

},

find(id){

return api.get(`${endpoints.users}/${id}`);

},

create(data){

return api.post(endpoints.users,data);

},

update(id,data){

return api.put(`${endpoints.users}/${id}`,data);

},

delete(id){

return api.delete(`${endpoints.users}/${id}`);

}

}