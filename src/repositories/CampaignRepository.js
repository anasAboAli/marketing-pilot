import api from "@/api/axios";
import endpoints from "@/api/endpoints";

export default{

all(){

return api.get(endpoints.campaigns);

},

find(id){

return api.get(`${endpoints.campaigns}/${id}`);

},

create(data){

return api.post(endpoints.campaigns,data);

},

update(id,data){

return api.put(`${endpoints.campaigns}/${id}`,data);

},

delete(id){

return api.delete(`${endpoints.campaigns}/${id}`);

}

}