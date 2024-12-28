import React from 'react'
import Manufacturer from '../Manufacturer.mp4';

export default function KnowManufacturer() {
    return (
        <>
            <section className='knowManuSection'>
                <h2 style={{textAlign:'center',fontSize:'30px'}}>Know Product Manufacturer</h2>
                <div>
                    <div className='menuContent'>
                        <p>Know and verify your product. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis quisquam maiores commodi temporibus deserunt assumenda excepturi recusandae iusto quod nisi!</p>
                        <button>Learn More <i className="fa-solid fa-arrow-right" style={{ padding: '0 6px' }}></i></button>
                    </div>
                    <div className='videoManufacture'>
                        <video src={Manufacturer} muted loop autoPlay width={'400vw'} style={{borderRadius:'8px'}}></video>
                    </div>
                </div>
            </section>
        </>
    )
}
