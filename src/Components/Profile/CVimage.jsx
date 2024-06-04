import './CVimage.css'

const CVimage = ({imageUrl,cvFileName}) => {
    return ( 
        <div className="cvImage-main">

            <div className='cv-title'><h2>My CV</h2></div>
            <div className="background" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="overlay">
                    <div className="content">
                        {cvFileName}
                    </div>          
                </div>
            
            </div>
           
            
        </div>
       
     );
}
 
export default CVimage;