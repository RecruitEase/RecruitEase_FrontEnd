import './Draft.css'

const Draft = () => {
    return ( 
        <div className="draft-main">
            <div>
                <h2>Saved Items</h2>
                <p>0 Job Posts</p>
            </div>
            <br/>
            <div className="draft-empty">
                <div className="draft-empty-comtent"><p>No Draft Applications Founds!</p></div>
            </div>

        </div>
     );
}
 
export default Draft;