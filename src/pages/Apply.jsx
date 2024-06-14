import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import ApplyJob from '../Components/ApplyJob/ApplyJob'

function Apply() {
  return (
    <div id="wrapper">
        <Header/>
        <div id="bodyContent">
            <ApplyJob/>
        </div>
        <Footer/>
    </div>
  )
}

export default Apply