import React from 'react'
import Manufacturer from '../Manufacturer.mp4';

export default function KnowManufacturer() {
    return (
        <>
            <section className='knowManuSection'>
                <h2>Know Product Manufacturer</h2>
                <div>
                    <div className='menuContent'>
                        <p>
                            Know and verify your product. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Quis quisquam maiores commodi temporibus deserunt assumenda excepturi recusandae iusto quod nisi!
                        </p>
                        <button>
                            Learn More <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                    <div className='videoManufacture'>
                        <video src={Manufacturer} muted loop autoPlay></video>
                    </div>
                </div>
            </section>
        </>
    )
}
