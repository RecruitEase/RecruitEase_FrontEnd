import React from 'react'
import '../css/JobView.css'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
//import Navbar from '../Components/JobViewComponents/Navbar/Navbar'
import Hero from '../Components/JobViewComponents/Hero/Hero'
import Intro from '../Components/JobViewComponents/Intro/Intro'
import Company from '../Components/JobViewComponents/Company/Company'
import RelatedJobs from '../Components/JobViewComponents/RelatedJobs/RelatedJobs'



function JobView() {
  return (
    <div id="wrapper">
        <Header/>
        <div id="bodyContent">
            <div>JobView</div>
            <button onClick={()=>alert("HI")}> Click 1</button>
        </div>
        {/* <Navbar/> */}
        <Hero/>
        <Intro/>
        <Company/>
        <RelatedJobs/>
        <Footer/>
    </div>
  )
}

export default JobView;