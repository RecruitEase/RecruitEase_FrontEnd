import React from 'react';
import './Company.css'; 
import ifs from '../../../assets/IFS.png';
import upload from '../../../assets/up_1.png';
import facebook from '../../../assets/fb.png';
import whatsapp from '../../../assets/wa.png';
import twitter from '../../../assets/tw.png';
import linkedin from '../../../assets/lk.png';
import inster from '../../../assets/ins.png';
import location from '../../../assets/send.png'
import time from '../../../assets/time.png'
import date from '../../../assets/ft.png'

const Company = () => {
  return (
    <div className="company">
      <img src={ifs} className='c_logo'/><br/><br/><br/>
      
      <h3>Front-End Developper</h3><br/>
      <h4>IFS Sri Lanka</h4><br/>
      
      <ul className="list">
      <li><img src={location} alt="" className="icon" />401/4, Colombo 05</li> 
      <li><img src={date} alt="" className="icon" />05 days left</li> 
      <li><img src={time} alt="" className="icon" />Full Time</li>  
      </ul>
     
      <p>person that is pro-active,whotakes initiative and responsibility, who gets excited by opportunities to learn, who has interest in understanding our customer needs</p><br/>
      <div className="columns">
        <div className="column">
          <ul>
            <li>Education</li>
            <li>Experience</li>
            <li>Salary Range</li>
          </ul>
        </div>
        <div className="column">
          <ul>
            <li className='li_3'>Qualification</li>
            <li className='li_3'>2-5 Years</li>
            <li className='li_3'>Any</li>
          </ul>
        </div>
      </div>
     
      
      <div className="share">
        <img src={upload} alt="Upload" />
        <img src={facebook} alt="Facebook" />
        <img src={whatsapp} alt="WhatsApp" />
        <img src={twitter} alt="Twitter" />
        <img src={linkedin} alt="LinkedIn" />
        <img src={inster} alt="Instagram" />
      </div><br/>
      <button className='btn b'>APPLY FOR JOB</button>
      <button className='btn_2 b'>SAVE JOB</button>
  
    </div>
  );
}

export default Company;
