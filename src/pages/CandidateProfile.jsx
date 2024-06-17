// import React from 'react'
import React, { useState } from 'react';
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import ProfileImage from '../Components/Profile/ProfileImage' 
import ButtonGroup from '../Components/Profile/ButtonGroup'
import StatusOfApplications from '../Components/Profile/StatusOfApplications'
import SavedItems from '../Components/Profile/SavedItems'
import Draft from '../Components/Profile/Draft'
import MyInformation from '../Components/Profile/MyInformation'
import CVimage from '../Components/Profile/CVimage'
import Progress from '../Components/Profile/Progress'

import "../css/CandidateProfile.css"


function CandidateProfile() {

  const [selectedSection, setSelectedSection] = useState("My Information");

  const renderContent = () => {
    switch (selectedSection) {
      case "Status of Applications":
        return <StatusOfApplications />;
      case "My Information":
        return <MyInformation />;
      case "Saved Items":
        return <SavedItems />;
      // case "Draft":
      //   return <Draft />;
      default:
        return <div>Draft Content</div>;
    }
  };

  const imageUrl="https://www.resumonk.com/assets/template-thumbnails/regal-0061058b06687d67e513234d9169de15ae663a638197357a947a0f5571dbdd9c.jpg"
  const cvFileName="cv.pdf"

  const comletePresentage ="75"
  return (
    
    <div id="wrapper">
        <Header/>
        <div id="bodyContent" className='bodyContent'>
            <div>
              <ProfileImage/>
              <br/><br/>
              <ButtonGroup onButtonClick={setSelectedSection} defaultActive="My Information"/>
              <br/>
              {renderContent()}
              <br/>
            </div>          
            <div className='right-coloum'>
              <div><Progress comletePresentage={comletePresentage}/></div>
              <div><CVimage imageUrl={imageUrl} cvFileName={cvFileName}/></div>
            </div>
        </div>
        
        <Footer/>
    </div>
  )
}

export default CandidateProfile