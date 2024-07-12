"use client"
import React from 'react';
import {Button} from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Home2 = () => {
    const { data: session } = useSession();
    console.log({ session });

    const axios=useAxiosAuth();

    const axiosTest=()=>{
        axios.get('/auth/refresh').then((res)=>{
            console.log(res);
        })
    }

    const notify = () => toast("Wow so easy!");
    return (
        <div>
            HOme
        </div>
    );
};

export default Home2;
