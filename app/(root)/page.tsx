"use client"
import React from 'react';
import HomeNew from "@/components/newLandingPage/HomeNew";
import { useSearchParams} from 'next/navigation';
import {Bounce,toast} from "react-toastify";
import Swal from 'sweetalert2'


const Home2 = () => {
  //error message toast 

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        color: 'white',
        iconColor: 'white',
        background: 'red',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
  const searchParams = useSearchParams()
 
  const error_message = searchParams.get('error_message')

  console.log("error_message",error_message)
 if(error_message){
    Toast.fire({
        icon: 'error',
        title: error_message,
      })
  }
  
    return (
        <HomeNew />
    );
};

export default Home2;