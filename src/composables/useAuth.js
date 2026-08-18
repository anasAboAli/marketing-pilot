import { useAuthStore } from "@/stores/auth";

export function useAuth(){

    const auth=useAuthStore();

    return{

        auth,

        login:auth.login,

        logout:auth.logout

    };

}