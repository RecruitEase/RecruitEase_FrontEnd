import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'

function Home() {
  return (
    <div id="wrapper">
        <Header/>
        <div id="bodyContent">
            <div>Home</div>
            <button onClick={()=>alert("HI")}> Click 1</button>
        </div>
        <Footer/>
    </div>
  )
}

export default Home