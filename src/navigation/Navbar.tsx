import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks';

import { Link } from 'react-router-dom';
import { showLogin, showLogOut } from '../auth/actions/loginLogoutShow';


const mainLinks = [
    { "title": "Home", "link": "/", "icon": <img src='icons/house.svg' alt='' /> },
    { "title": "Fishes", "link": "/fish", "icon":<img src='icons/fish.svg' alt='' /> },
    { "title": "Tank", "link": "/tank", "icon": <img src='icons/aquarium.svg' alt='' /> },
    { "title": "Plants", "link": "/plants", "icon": <img src='icons/plant.svg' alt='' /> },
    { "title": "closed", "link": "/protected", "icon": <img src='icons/aquarium.svg' alt='' /> },
    // {"title": "", "link": "", "icon":< />},
]

const Navbar = () => {
    const dispatch:any = useAppDispatch()
    const { user: currentUser } = useAppSelector((state) => state.auth);
    console.log("path:", window.location.pathname);



    return (
        <div className='Main-Navbar'>
            <ul className="nav nav-tabs">
                {mainLinks.map((link, i) => (
                    <li className='nav-item' key={i}>
                        <Link className='nav-link' to={link.link}>{link.icon} {link.title}</Link>
                    </li>
                ))}

                {currentUser ? (
                    <li className='nav-item' key="logout">
                        <Link className='nav-link' to='#' onClick={() => {dispatch(showLogOut()); console.log("logout pressed");}}> <img src='icons/logout.svg' alt='' /> Logout </Link> 
                    </li>
                ) : (
                    <li className='nav-item' key="login">
                        <Link className='nav-link' to='#' onClick={() => dispatch(showLogin())}><img src='icons/login.svg' alt='' /> Login </Link> 
                    </li>
                    )}
                {currentUser ? (
                    <li className='nav-item' key="profile">
                        <Link className='nav-link' to='profile'><img src='icons/profile.svg' alt='' /> Profile </Link>
                    </li>
                ) : (
                    <li className='nav-item' key="registration">
                        <Link className='nav-link' to='registration'><img src='icons/register.svg' alt='' /> Registration </Link> 
                    </li>
                )}

            </ul>
        </div>
    )
}

export default Navbar

//   <li class="nav-item">
//     <a class="nav-link active" aria-current="page" href="#">Link</a>
//   </li>
//   <li class="nav-item">
//     <a class="nav-link" href="#">Link</a>
//   </li>
//   <li class="nav-item">
//     <a class="nav-link disabled">Disabled</a>
//   </li>