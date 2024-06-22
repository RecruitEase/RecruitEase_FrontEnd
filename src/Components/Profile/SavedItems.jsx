import './SavedItems.css'

const SavedItems = () => {
    return ( 
        <div className="save-main">
            <div>
                <h2>Saved Items</h2>
                <p>0 Job Posts</p>
            </div>
            <br/>
            <div className="save-empty">
                <div className="save-empty-comtent"><p>No Saved Jobs Founds!</p></div>
            </div>

        </div>
     );
}
 
export default SavedItems;