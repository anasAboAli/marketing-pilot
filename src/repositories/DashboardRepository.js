import api from "@/api/axios";
import endpoints from "@/api/endpoints";

export default{

statistics(){

return api.get(endpoints.dashboard);

}

}