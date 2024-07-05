import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler= NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                const res=await fetch(process.env.API_GATEWAY_LOGIN,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        email:credentials?.email,
                        password:credentials?.password
                    })
                });
                // console.log(res)
                const user=await res.json();

                if (user) {
                    console.log("user obj........................")
                    console.log(user)

                    if(user.errors && user.errors!=''){
                        throw new Error(user.errors)
                    }else{
                        return user

                    }
                    // Any object returned will be saved in `user` property of the JWT
                } else {
                    console.log("Dedesdwedw")
                    // If you return null then an error will be displayed advising the user to check their details.
                    throw new Error(JSON.stringify({error:user.errors,status:false}))

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],pages:{
        signIn:"/signin"
    },
    callbacks:{
        //to keep the data coming from backend saved without missing the attributes
        async jwt({token,user}){
            return {...token,...user};
        },

        async session({session,token,user}){
            session.user=token as any;
            return session;
        }
    }
});

export {handler as GET, handler as POST}