import "./ProfileImage.css"
import Switch from '@mui/material/Switch';
import NearMeIcon from '@mui/icons-material/NearMe';
import { grey } from "@mui/material/colors";
import Card from '@mui/material/Card';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
import imageUrl from '../../assets/ProfilePicture.jpg';
const label = { inputProps: { 'aria-label': 'Switch demo' } };


// const imageUrl = "../../assets/ProfilePicture.jpg"
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
    const theme = useTheme();
    return ( 
        <div className="main">
            <div className="image-main">
                {/* <div>
                <img  className="image" src={imageUrl}></img>
                </div>
                <div className="name-main">
                    <div><p className="name">{name}</p></div>
                    <div className="address"><NearMeIcon sx={{fontSize:"medium",color:"grey"}}  /> {address}</div>
                    <button className="setting" onClick={()=>alert("HI")}> Setting</button>
                    <hr/>
                </div> */}
                
                
                <Card sx={{ display: 'flex',backgroundColor: "#f0f2f5",boxShadow: 'none' }}>
                    <CardMedia
                        component="img"
                        sx={{ maxWidth: 151,height:"auto" }}
                        image={imageUrl}
                        // alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto',alignContent:"center" }}>
                            <Typography component="div" variant="h5">
                                {name}
                            </Typography>
                            <Typography variant="subtitle" color="text.secondary" component="div">
                                <NearMeIcon sx={{fontSize:"medium",color:"grey"}}  /> {address}
                            </Typography>
                        </CardContent>
                        {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <IconButton aria-label="previous">
                            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                        </IconButton>
                        <IconButton aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <IconButton aria-label="next">
                            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                        </IconButton>
                        </Box> */}
                    </Box>
                
                </Card>
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