import LOGO from "../assets/logo.jpg"
import React from "react"

function Header() {
    return (
        <header id="main-header">
            <div id="title">
                <img src={LOGO} alt="Food Order Web Application"/>
                <h1>React Food Order Web Application</h1>
            </div>
            <nav>
                <button>Cart (0)</button>
            </nav>
        </header>
    )
}

export default Header;