import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <ul className='navbar'>
        <li><NavLink className='link' to="/category">Category</NavLink></li>
        <li><NavLink className='link' to="/products">Products</NavLink></li>
        <li><NavLink className='link' to="/orders">Orders</NavLink></li>
        <li><NavLink className='link' to="/users">Users</NavLink></li>
        <li><NavLink className='link' to="/logout">Logout</NavLink></li>
      </ul>
    </div>
  )
}

export default Navbar
