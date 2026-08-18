import { useAuthStore } from "@/stores/auth";

export default function(to){

    const auth=useAuthStore();

    if(!auth.isAuthenticated && to.path!="/login"){

        return "/login";

    }

}