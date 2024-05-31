import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

function Apply() {
  return (
    <div id="wrapper">
        <Header/>
        <div id="bodyContent">
            <div>Apply</div>
            <button onClick={()=>alert("HI")}> Click 1</button>
        </div>
        <Footer/>
    </div>
  )
}

export default Apply