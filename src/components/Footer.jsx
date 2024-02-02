import React from "react";
import Logo from "../imgs/logo.jpg"

const Footer = () => {
    return (
        <footer>
            <img src={Logo} alt="" />
            <span>
                Made in React.js
            </span>
        </footer>
    );
};

export default Footer;