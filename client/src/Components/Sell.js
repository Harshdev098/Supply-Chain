import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import SellImage from '../sellImage.jpeg'
import LoginContext from '../Context/LoginContext';

export default function Sell() {
  const {loginCredential}=useContext(LoginContext)
  return (
    <>
        <div className='sellComponent'>
            <div className='sellComponentContent'>
                <h3>Sell Your Products</h3>
                <p>Sell your products to a verified one!</p>
                <Link to={`/main/${loginCredential.id ? loginCredential.id : localStorage.getItem("UserId")}/sell`}>Sell Product <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
            <div>
                <img src={SellImage} alt="Sell Product" />
            </div>
        </div>
    </>
  )
}
