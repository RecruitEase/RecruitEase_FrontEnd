"use client"
import React, {useEffect} from 'react';
import {signOut} from "next-auth/react";

const Logout = () => {

    useEffect(()=> {
        signOut(
            {
                redirect: true,
                callbackUrl: `/`
            }
        );
    },[])

    return (
        <div>

        </div>
    );
};

export default Logout;
