import "./ProfileImage.css"
import Switch from '@mui/material/Switch';
import NearMeIcon from '@mui/icons-material/NearMe';
import { grey } from "@mui/material/colors";

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const imageUrl = "https://previews.123rf.com/images/happyvector071/happyvector0711904/happyvector071190414608/120957993-creative-illustration-of-default-avatar-profile-placeholder-isolated-on-background-art-design-grey.jpg"
const name = "Sajith Bandara"
const address="Pallebedda Ratnapura"


const handleChange = (event) => {
    if (event.target.checked) {
    console.log('Switch is ON');
    } else {
    console.log('Switch is OFF');
    }
};

const color = grey[300]


const ProfileImage = () => {
    return ( 
        <div className="main">
            <div className="image-main">
                <div>
                <img  className="image" src={imageUrl}></img>
                </div>
                <div className="name-main">
                    <div><p className="name">{name}</p></div>
                    <div className="address"><NearMeIcon sx={{fontSize:"medium",color:"grey"}}  /> {address}</div>
                    <button className="setting" onClick={()=>alert("HI")}> Setting</button>
                    <hr/>
                </div>
                
            </div>
            <div >
                <div className="switch">
                    <div><p>Shere my CV with employee</p></div>
                    <div><Switch {...label} onChange={handleChange} /></div> 
                </div>
                                            
            </div>
            
           
        </div>
     );
}
 
export default ProfileImage;