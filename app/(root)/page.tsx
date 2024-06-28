"use client"
import React from 'react';
import {Button} from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";


const Home = () => {
    const { data: session } = useSession();
    console.log({ session });

    const axios=useAxiosAuth();

    const axiosTest=()=>{
        axios.get('/auth/refresh').then((res)=>{
            console.log(res);
        })
    }
    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    Welcome, Chathura
                    {session?.user?(
                        <>
                        <p>{session.user.email}</p>
                        <Button onClick={()=>signOut()}>sign out</Button>
                        </>
                    ):(
                        <Button onClick={()=>signIn()} >Signin</Button>

                    )}

                    <Button onClick={()=>axiosTest()} >test</Button>

                </header>
            </div>
        </section>
    );
};

export default Home;
