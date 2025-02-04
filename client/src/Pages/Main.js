import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import KnowManufacturer from '../Components/KnowManufacturer';
import Sell from '../Components/Sell';
import LoginContext from '../Context/LoginContext';
import { handleFetchData } from '../handlers/MainData';
import MetamaskContext from '../Context/metamask';

export default function Main() {
  const [paramsData,setParamsData]=useState()
  const {state,handleConnection}=useContext(MetamaskContext)
  const navigate=useNavigate()
  const {loginCredential}=useContext(LoginContext)
  let listorAccept=document.getElementById('listorAccept')
  if((localStorage.getItem('UserId')).split("_")[0]!=='Manufacturer'){
    listorAccept.textContent('Accept Delivery')
  }
  const navigation=()=>{
    if((localStorage.getItem('UserId')).split("_")[0]==='Manufacturer'){
      navigate(`/main/${loginCredential.id ? loginCredential.id : localStorage.getItem('UserId')}/product/list`)
    }
    else{
      navigate(`/main/${loginCredential.id ? loginCredential.id : localStorage.getItem('UserId')}/acceptDelivery`)
    }
  }

  useEffect(()=>{
    const Fetchdata=async()=>{
      const ParamData=await handleFetchData()
      setParamsData(ParamData)
    }
    handleConnection()
    Fetchdata()
  },[])

  return (
    <>
      <Navbar />
      <main className="main">
        <div className="leftContent">
          <div onClick={()=>{navigation()}}>
            <h3 id='listorAccept'>List Product</h3>
            <p>
              Lorem ipsum, dolor quasi deserunt facere?
              <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i>
            </p>
          </div>
          <div onClick={()=>{navigate('#trackProduct')}}>
            <h3>Track Product</h3>
            <p>
              Lorem ipsum, dolor quasi deserunt facere?
              <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i>
            </p>
          </div>
          <div onClick={()=>{navigate(`/main/${loginCredential.id ? loginCredential.id : localStorage.getItem('UserId')}/buyerList`)}}>
            <h3>Your Buyers</h3>
            <p>
              Lorem ipsum, dolor quasi deserunt facere?
              <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i>
            </p>
          </div>
          <div onClick={()=>{navigate(`/main/${loginCredential.id ? loginCredential.id : localStorage.getItem('UserId')}/enquiry`)}}>
            <h3>Product Enquiry</h3>
            <p>
              Lorem ipsum, dolor quasi deserunt facere?
              <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i>
            </p>
          </div>
        </div>
        <div className="rightContent">
          <h3 className="statsHeading">Your Stats</h3>
          <div className="statBoxes">
            <div className="statBox">
              <h3>Complaints</h3>
              <p>{paramsData}</p>
            </div>
            <div className="statBox">
              <h3>Products</h3>
              <p>234</p>
            </div>
            <div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div>
            <div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div><div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div><div className="statBox">
              <h3>sdfjsdfd</h3>
              <p>234</p>
            </div>
          </div>
        </div>
      </main>
      <main style={{backgroundColor:'rgb(233, 233, 235)'}}>
      <KnowManufacturer />
      <section className='trackProduct'>
        <h2 style={{fontSize:'30px'}}>Track your Product</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem quos neque accusamus dolorum, sit eaque nesciunt dolores repellendus, temporibus placeat optio quaerat excepturi ipsum!</p>
          <button onClick={()=>{navigate(`/main/${loginCredential.id ? loginCredential.id : localStorage.getItem('UserId')}/track`)}}>Track <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i></button>
        <div className='TrackOutput'></div>
      </section>
      <Sell />
      </main>
    </>
  );
}
