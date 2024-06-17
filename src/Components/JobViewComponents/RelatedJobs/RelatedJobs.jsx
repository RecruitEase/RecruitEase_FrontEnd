import React,{useRef} from 'react'
import './RelatedJobs.css'
import next_icon from '../../../assets/next-icon.png'
import back_icon from '../../../assets/back-icon.png'
import WSO2 from '../../../assets/wso2.png'
import location from '../../../assets/send.png'
import time from '../../../assets/time.png'
import date from '../../../assets/ft.png'

const RelatedJobs = () => {
  const slider = useRef();
    let tx = 0;

   const slideForward = ()=>{
      if(tx > -50){
        tx -=25;
      }
      slider.current.style.transform = `translateX(${tx}%)`;
   }
   const slideBackward = ()=>{
    if(tx < -50){
      tx +=25;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
    
   }


  return (
    <div className='relatedjobs'>
      <div className='control'>
      <h2>Related Jobs</h2><br/><br/>
      <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>
      <img src={next_icon} alt="" className='next-btn' onClick={slideForward}/>
      </div>
      
      
      <div className="slider">
        <ul ref={slider}>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

          <li>
            <div className="slide">
              <div className="user-info">
                <img src={WSO2} className='c_logo'/>
                <span><img src={date} alt="" className="icon" />5 days left</span>  
              </div>
              <div>
              <h3>WSO2-Colombo</h3>
              <p>Software Company in Sri Lanka</p>
              <li><img src={location} alt="" className="icon" />colombo,05</li>
              <li><img src={time} alt="" className="icon" />Full-Time</li>      
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
  )
}

export default RelatedJobs
