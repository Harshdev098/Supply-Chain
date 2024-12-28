import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import animation from '../animation.gif'
export default function Header() {
    const navigate = useNavigate();
    return (
        <>
            <header>
                <nav>
                    <div>
                        <h1 style={{ color: 'white', fontSize: '32px' }}>ChainX</h1>
                    </div>
                    <div>
                        <ul>
                            <Link to="/" ><li>Home</li></Link>
                            <Link to="/#aboutUs" ><li>About</li></Link>
                            <Link to="/#services" ><li>Services</li></Link>
                            <Link to="/" ><li>GitHub</li></Link>
                            <button onClick={()=>{navigate('/login')}}><li style={{ margin: '0px' }}>Login/Signup</li></button>
                        </ul>
                    </div>
                </nav>
                <div className='headerContent'>
                    <div className='heading'>
                        <h2 style={{ fontSize: '2.1rem', padding: '0px', margin: "6px" }}>Decentrailize your Product supply chain with safety</h2>
                        <p style={{ fontSize: '19px', marginLeft: '12px' }}>ChainX leverages cutting-edge blockchain technology to revolutionize how supply chains operate. We ensure your products move with transparency, authenticity, and efficiency from start to finish.</p>
                        <div className='btns'>
                            <button onClick={() => { navigate('/login') }}>Connect with the chain</button>
                            <button onClick={() => { navigate('/consumer/verify') }}>Verify Product</button>
                        </div>
                    </div>
                    <div className='videoAnimation'>
                        <img src={animation} autoPlay width={"100%"}></img>
                    </div>
                </div>
            </header>
        </>
    )
}
