import React from "react";
import "./DarkMode.css";

const DarkMode = () => {
    const setDarkMode =()=> {
        document.querySelector('body').setAttribute('data-theme' , "dark");
        document.querySelector('body').style.backgroundColor = "#282c34"

        localStorage.setItem('selectedTheme', "dark");
    };
    const setLightMode =()=> {
        document.querySelector('body').setAttribute('data-theme' , "light");
        document.querySelector('body').style.backgroundColor = "white"
        localStorage.setItem('selectedTheme', "light");
 };
    const selectedTheme = localStorage.getItem('selectedTheme');
    if (selectedTheme === "dark") {
        setDarkMode();
    } else {
        setLightMode();
    }
    const toggleTheme =(event)=> {
        if (event.target.checked) {
            setDarkMode();
        } else { setLightMode(); 
        }
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={selectedTheme=="dark"}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>

            </label>
        </div>
    );
};

export default DarkMode;