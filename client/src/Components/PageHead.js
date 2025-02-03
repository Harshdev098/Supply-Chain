import React from 'react'

export default function PageHead(props) {
  const BtnStyling={
    fontSize:"18px",
    padding:'6px',
    margin:'10px',
    color:'white',
    border:'none',
    borderBottom:'1.6px solid white',
    borderRadius:'4px',
    position:'absolute',
    background:'none',
    cursor:'pointer'
  }
  return (
    <>
        <button style={BtnStyling} onClick={()=>{window.history.back()}}>Back</button>
        <div className='pageNavbar'>
            <h2 style={{fontSize:'2.6rem',padding:'0px',margin:'0px'}}>{props.heading}</h2>
            <p style={{fontSize:'17px'}}>{props.para}</p>
        </div>
    </>
  )
}
