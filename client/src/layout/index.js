import React from "react";
import logo from "../public/logo.png";

const AuthLayouts = ({ children }) => {
    return (
        <>
            <header className="flex justify-center items-center bg-white">
                <img
                    src={logo}
                    alt='logo'
                    width={100}
                    height={60}
                />
            </header>

            {children}
        </>
    )
}

export default AuthLayouts;