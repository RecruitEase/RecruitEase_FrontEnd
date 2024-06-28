import NextAuth from "next-auth";
import {mod} from "@internationalized/date/src/utils";


//types for custom session object
declare module "next-auth"{

    //dynamic roledetail object for different tyes of roles
    interface roleDetailObject{
        [key: string]: any;
    }

    interface Session{
        user:{
            id:string;
            firstName:string;
            lastName:string;
            email:string;
            role:string;
            roleDetails:roleDetailObject;
            createdAt:string;
            address:string;
            accessToken:string;
            refreshToken:string;
        }
    }
}