import { useState } from 'react';
import './MyInformation.css'

const MyInformation = () => {

    // Backend variables for autofill
    const backendData = {
        fname: 'Sjith',
        lname: 'Bandara',
        email: 'sajith@.com',
    };

    // State variables
    const [fname, setFname] = useState(backendData.fname);
    const [lname, setLname] = useState(backendData.lname);
    const [designation, setDesignation] = useState('');
    const [summary, setSummary] = useState('');
    const [additionalQualifi, setAdditionalQualifi] = useState('');
    const [Psectors, setPsectors] = useState('');
    const [email, setEmail] = useState(backendData.email);
    const [mNumber, setMNumber] = useState('');
    const [address, setAddress] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            fname,
            lname,
            designation,
            summary,
            additionalQualifi,
            Psectors,
            email,
            mNumber,
            address,
        });
    };
   

    return ( 
        <div>
            <h2>My Information</h2><br/>
            <form>
                <h3>Basic Infomation</h3><br/>                
                <div className='name'>
                    <div>
                        <label for="fname"><h3>First name</h3></label>
                        <input type="text" id="fname" className='input' name="fname" value={fname} onChange={(e) => setFname(e.target.value)}/>
                    </div>
                    <div className='left-field'>
                        <label for="lname"><h3>Last name</h3></label>
                        <input type="text" id="lname" className='input' name="lname" value={lname} onChange={(e) => setLname(e.target.value)}/>
                    </div>
                </div>
                <br/><br/>
                <div>
                        <label for="designation"><h3>Designation</h3></label>
                        <input type="text" id="designation" className='input' name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)}/><br/><br/>

                        <label for="summary"><h3>Personal Summary</h3></label>
                        <textarea type="text" id="summary" className='input summary' name="summary" value={summary} onChange={(e) => setSummary(e.target.value)}/><br/><br/><br/>
                </div>                           

                <h3>Career Infomation</h3><br/>
                <div>
                        <label for="additionalQualifi"><h3>Additional Qualifications</h3></label>
                        <input type="text" id="additionalQualifi" className='input' name="additionalQualifi" value={additionalQualifi} onChange={(e) => setAdditionalQualifi(e.target.value)}/><br/><br/>

                        <label for="Psectors"><h3>Preferred Sectors</h3></label>
                        <input type="text" id="Psectors" className='input' name="Psectors" value={Psectors} onChange={(e) => setPsectors(e.target.value)}/><br/><br/><br/>
                </div>

                <h3>Contact Infomation</h3><br/>
                <div className='name'>
                    <div>
                        <label for="email"><h3>Email</h3></label>
                        <input type="email" id="email" className='input' name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label for="mNumber"><h3>Mobile Number</h3></label>
                        <input type="text" id="mNumber" className='input' name="mNumber" value={mNumber} onChange={(e) => setMNumber(e.target.value)}/>
                    </div>
                </div>
                <br/><br/>
                <div>
                        <label for="address"><h3>Address</h3></label>                        <input type="text" id="address" className='input' name="address" value={address} onChange={(e) => setAddress(e.target.value)}/><br/>
                </div><br/><br/>
            </form>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
     );
}
 
export default MyInformation;