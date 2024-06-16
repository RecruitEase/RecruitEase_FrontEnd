import "./StatusOfApplications.css"

const StatusOfApplications = () => {
    return ( 
        <div className="staus-main">
            <div>
                <h2>Status of Aplications</h2>
                <p>0 Aplycations</p>
            </div>
            <br/>
            <div className="empty">
                <div className="empty-comtent"><p>No Aplications Founds!</p></div>
            </div>

        </div>
     );
}
 
export default StatusOfApplications;