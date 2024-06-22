import React, { useState, useEffect } from 'react';
import "./ButtonGroup.css";

const ButtonGroup = ({ onButtonClick, defaultActive }) => {
    const [activeButton, setActiveButton] = useState(defaultActive);

    // Set the default active button on initial mount
    useEffect(() => {
        onButtonClick(defaultActive);
    }, [defaultActive, onButtonClick]);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        onButtonClick(buttonName);
    };

    return ( 
        <div className="main">
            <div className="button-main">
                <button 
                    className={`button ${activeButton === "Status of Applications" ? 'active' : ''}`} 
                    onClick={() => handleButtonClick("Status of Applications")}
                >
                    Status of Applications
                </button>
                <button 
                    className={`button ${activeButton === "My Information" ? 'active' : ''}`} 
                    onClick={() => handleButtonClick("My Information")}
                >
                    My Information
                </button>
                <button 
                    className={`button ${activeButton === "Saved Items" ? 'active' : ''}`} 
                    onClick={() => handleButtonClick("Saved Items")}
                >
                    Saved Items
                </button>
                {/* <button 
                    className={`button ${activeButton === "Draft" ? 'active' : ''}`} 
                    onClick={() => handleButtonClick("Draft")}
                >
                    Draft
                </button> */}
            </div>
        </div>
    );
}

ButtonGroup.defaultProps = {
    defaultActive: "My Information"
};

export default ButtonGroup;
