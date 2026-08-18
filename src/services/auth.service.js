export default {

    login(){

        return Promise.resolve({

            token:"demo-token",

            user:{

                id:1,

                name:"أحمد محمد",

                email:"admin@example.com",

                role:"مدير"

            }

        });

    },

    logout(){

        return Promise.resolve();

    }

}