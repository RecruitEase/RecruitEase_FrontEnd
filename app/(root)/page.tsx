"use client"
import React from 'react';
import {Button} from "@nextui-org/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {signout} from "next-auth/core/routes";

const Home = () => {
    const { data: session } = useSession();
    console.log({ session });

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
                </header>
            </div>
        </section>
    );
};

export default Home;
