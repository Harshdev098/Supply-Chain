import React from 'react'
import profile from '../profile.png'

export default function Navbar() {
  return (
    <>
        <nav className='mainNav'>
            <div>
                <h1>ChainX</h1>
            </div>
            <div>
                <ul>
                    {/* <li><i class="fa-solid fa-sun" style={{fontSize:'30px',margin:'6px',padding:'2px'}}></i></li> */}
                    <li><img src={profile} alt="" width={"60px"} /></li>
                </ul>
            </div>
        </nav>
    </>
  )
}
