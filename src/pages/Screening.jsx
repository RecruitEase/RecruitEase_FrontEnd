import React from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import '../Components/ApplyJob/ApplyJob.css'
import QuestionComponent from '../Components/Screening/QuestionComponent'
function screening() {
  return (
    <div id="wrapper">
      <Header />
      <div id="bodyContent">
        <h1 className="text-xl font-bold m-4">Screening Stage</h1>
        <p className='m-4'>Screening stage content goes here</p>

        <QuestionComponent questionNumber={1} questionText="Are you holding a diploma or degree in a shipping-related field?" />


      </div>
      <Footer />
    </div>
  )
}

export default screening
