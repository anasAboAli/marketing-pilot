import { useAuthStore } from "@/stores/auth";

export default function(to){

const auth=useAuthStore();

if(to.meta.role){

if(auth.user?.role!==to.meta.role){

return "/";

}

}

}