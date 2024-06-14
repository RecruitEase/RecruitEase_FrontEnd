import React from 'react'
import './Navbar.css'
import avatar from '../../../assets/avatar.png'
import logo from '../../../assets/star.png'

const Navbar = () => {
  return (
    <nav className='container'>
      <img src={logo} alt=""  className='logo'/>
      <ul>
        <li>Home</li>
        <li>Jobs</li>
        <li>Explore</li>
        <li>Contact Us</li>
        <li>Store</li>
          
      </ul>
      <img src={avatar}/>
    </nav>
  )
}

export default Navbar
