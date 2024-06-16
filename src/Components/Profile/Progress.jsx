import './Progress.css'
import CircularProgress from '@mui/joy/CircularProgress';

const Progress = ({comletePresentage}) => {
    return ( 
        <div className="progress-main">
            <div className="progress-content">
                <div>
                    <CircularProgress size="lg"  determinate value={comletePresentage} sx={{ '--CircularProgress-size': '80px' }}>{comletePresentage}%</CircularProgress>
                </div>
                <div className='progressText'><p>Complete your profile For better experience</p></div>
            </div>
            
        </div>
     );
}
 
export default Progress;