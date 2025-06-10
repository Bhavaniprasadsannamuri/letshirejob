import React from 'react'
import logo from "./logo192.png"
import "./ResNavbar.css"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
const ResNavbar = () => {

    return (

        <nav className="navbar">
            <div className='navbar-container'>
                <div className='logo'>
                    <img src={logo} width="50px" />
                </div>
                <div className="nav-toggle-menu">
                    <MenuIcon className='nav-menu-open'></MenuIcon>
                    <CloseIcon className='nav-menu-close'></CloseIcon>
                </div>
                {/* menu list */}
                <div className='menu-list'>
                    <div className='menu'>
                        <p>products</p>
                        <ul className='sub-menu'>
                            <li><a href="">react</a></li>
                            <li><a href="">Blog</a></li>
                            <li><a href="">contact</a></li>
                            <li><a href="">products</a></li>
                        </ul>
                    </div>
                    <div className='menu'>
                        <p>home</p>
                        <ul className='sub-menu'>
                            <li><a href="">Blog</a></li>
                            <li><a href="">contact</a></li>
                            <li><a href="">products</a></li>
                        </ul>
                    </div>
                    <div className='menu'>
                        <p>blog</p>
                        <ul className='sub-menu'>
                            <li><a href="">Blog</a></li>
                            <li><a href="">contact</a></li>
                            <li><a href="">products</a></li>
                        </ul>

                    </div>
                    <div className='menu'>
                        <p>contact</p>
                        <ul className='sub-menu' >
                            <li><a href="">Blog</a></li>
                            <li><a href="">contact</a></li>
                            <li><a href="">products</a></li>
                        </ul>

                    </div>

                </div>
            </div>
        </nav>


    )
}

export default ResNavbar
