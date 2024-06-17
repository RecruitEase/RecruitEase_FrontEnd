import "./StatusOfApplications.css"

const StatusOfApplications = () => {
    return ( 
        <div className="staus-main">
            <div>
                <h2>Status of Applications</h2>
                <p>0 Applications</p>
            </div>
            <br/>
            <div className="empty">
                <div className="empty-comtent"><p>No Applications Founds!</p></div>
            </div>

        </div>
     );
}
 
export default StatusOfApplications;