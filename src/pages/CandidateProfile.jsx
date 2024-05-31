import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

function CandidateProfile() {
  return (
    <div id="wrapper">
        <Header/>
        <div id="bodyContent">
            <div>CandidateProfile</div>
            <button onClick={()=>alert("HI")}> Click 1</button>
        </div>
        <Footer/>
    </div>
  )
}

export default CandidateProfile