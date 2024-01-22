import React from 'react'
import {FaGithub, FaLinkedin} from 'react-icons/fa'
import { Link } from 'react-router-dom'



const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='col col-1'>
                    <h1><Link to="/">Coin<span className='primary'>Hub</span></Link></h1>
                </div>
                <div className='col'>
                    <h5>Support</h5>
                    <span className='bar'></span>
                        <Link to='/contact'>Contact Us</Link>
                        <a href='/'>FAQ</a>

                </div>
                <div className='col'>
                    <h5>Developers</h5>
                    <span className='bar'> </span>
                        <a href='https://berlinrivas.netlify.app/'>Berlin Rivas</a>
                        <a href='https://www.coingecko.com/api/documentation'>API</a>
                   
                </div>
                <div className='col'>
                    <h5>Company</h5>
                    <span className='bar'> </span>
                        <a href='/'>About</a>
                        <a href='/'>Information</a>
                        <a href='/'>Legal</a>
                        <a href='/'>Privacy</a>
                </div>
                <div className='col'>
                    <h5>Social</h5>
                    <span className='bar'> </span>

                        <a href='https://www.linkedin.com/in/berlinrivas/'><FaLinkedin className='icon'/></a>
                        <a href='https://github.com/BerlinRivas'><FaGithub className='icon'/></a>
                </div>
            </div>
            
        </div>
    )
}

export default Footer