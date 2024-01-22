import React, {useState} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'
import { Link } from 'react-router-dom'
export const Navbar = () => {
        const [click, setClick] = useState(false);
        const handleClick = () => setClick(!click)

  return (
    <div className='header'>
        <div className='container'>
            <h1><Link to="/">Coin<span className='primary'>Hub</span></Link></h1>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/market">Market</Link>
                </li>
                <li>
                    <Link to="/trends">Trends</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
            <div className='btn-group'>
                <button className='btn'>Connect Wallet</button>
            </div>
            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={20} style={{color: '#333'}}/>) : (<FaBars size={20} style={{color: '#333'}} />)}
                
            </div>
        </div>
    </div>
  )
}
export default Navbar
