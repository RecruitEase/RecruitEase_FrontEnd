import React from 'react';
import './Intro.css';
import upload from '../../../assets/up_1.png';
import facebook from '../../../assets/fb.png';
import whatsapp from '../../../assets/wa.png';
import twitter from '../../../assets/tw.png';
import linkedin from '../../../assets/lk.png';
import inster from '../../../assets/ins.png';



const Intro = () => {
  return (
    <div className='intro-container'>
      <div className='intro'>
      
      <br></br>
      <br></br>
      <h3>Software Engineer/Senior Software Engineer</h3>
      <p>As a Software Engineer in the R&D team, you’ll be responsible for delivering quality software by applying sound development practices and leveraging test-driven development methodology. Based on user stories and functionality specification, you will develop software components as they relate to our Asset Management Product Offering. You will work with back-end and front-end components, design and build solutions to address our customer needs.</p>
      <br></br>
      <h4>Qualifications</h4>
      <ul>
        <li>A degree in Software Engineering, Computer Science or Information Technology.</li>
        <li>Previous working experience with Enterprise grade software is a definite advantage.</li>
        <li>Knowledge in .Net framework, Java, Oracle Database, and Scripting.</li>
        <li>2+ years of proven experience working in a similar role. Fresh graduates are also welcome to apply.</li>
        <li>The ability to work in distributed Global team set up.</li>
      </ul>
      <br></br>
      <h4>Soft Skills</h4>
      <p>In order to join the Asset Management team in IFS R&D as a Senior Software Engineer / Software Engineer,you need to be good at listening and communicating, and share knowledge and experience. If you consider yourself as a person that is pro-active,whotakes initiative and responsibility, who gets excited by opportunities to learn, who has interest in understanding our customer needs, and design and build solutions in addressing those, we want tohear from you.</p>
      <br></br>
      <h4>Company Requirements</h4>
      <ul>
        <li>Analyzing and interpreting the requirements to fulfill the domain needs.</li>
        <li>Applying the best engineering and architectural concepts.</li>
        <li>Ensuring product performance and maintainability by adhering to IFS’ standards, guidelines, processes, and tools.</li>
        <li>Performing comprehensive testing and documentation tasks.</li>
        <li>Actively participating in communication with stakeholders to ensure the solution is fit for purpose.</li>
      </ul>
      <br></br>
      <h3>CLICK THE APPLY BUTTON TO SEND YOUR CV VIA RECUITEASE</h3>
      <br></br>
      <button className='btn btn_1'>APPLY FOR JOB</button>
      <button className='btn_2'>SAVE JOB</button>
      <br></br><br></br>

      <div className='share'>
      <p>Unemployment in Sri Lanka estimated to be over 390,816, 
      share this job and help another!</p>
        <img src={upload} alt="Upload" />
        <img src={facebook} alt="Facebook" />
        <img src={whatsapp} alt="WhatsApp" />
        <img src={twitter} alt="Twitter" />
        <img src={linkedin} alt="LinkedIn" />
        <img src={inster} alt="Instagram" />
      </div>
      
    </div>
    {/* <div className='company_1'>
        <Company />
    </div>  */}
    </div>
    
  );
}

export default Intro;

