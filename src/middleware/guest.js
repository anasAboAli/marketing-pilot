import { useAuthStore } from "@/stores/auth";

export default function(){

const auth=useAuthStore();

if(auth.isAuthenticated){

return "/";

}

}