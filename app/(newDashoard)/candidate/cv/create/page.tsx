"use client"
import HeaderBox from '@/components/dashboard/HeaderBox'
import React from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import ResumeState from "@/components/cvBuilder/Context/ResumeState";
import Home from "@/components/cvBuilder/Pages/Home/Home";

function Create() {
  return (
    <div>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Your Job Recommendations"
          subtext="Here are some jobs that we think you might be interested in."
        />
      </header>
      <ChakraProvider >

        <ResumeState>
          <Home />
        </ResumeState>
      </ChakraProvider>


    </div>
  )
}

export default Create
