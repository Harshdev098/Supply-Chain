import React, { useContext, useRef, useState } from 'react'
import MetamaskContext from '../Context/metamask'
import QRCode from 'react-qr-code'
import Navbar from '../Components/Navbar'
import { handleTracking } from '../handlers/Tracking'
import { handleFetchDetails } from '../handlers/AddProduct'

export default function Track() {
    const PNumber = useRef()
    const [trackstate, setTrackState] = useState([])
    const { state } = useContext(MetamaskContext)
    const [details, setDetails] = useState(null)
    const [productID, setProductID] = useState(null)

    const TrackProduct = async (e) => {
        e.preventDefault()
        if (state.contract) {
            const content = document.getElementById('content')
            const { trackingResult, TrackContent } = await handleTracking(state, PNumber.current.value, content)
            setProductID(PNumber.current.value)
            console.log("result of tracking is ", TrackContent)
            const projDetails = await handleFetchDetails(state, PNumber.current.value)
            setDetails(projDetails)
            setTrackState(TrackContent)
        }
    }
    return (
        <>
            <Navbar />
            <div className='sellPageContainer'>
                <div className='sellForm'>
                    <form onSubmit={TrackProduct}>
                        <input type="number" placeholder='Enter the Product Number' ref={PNumber} />
                        <button>Track Product</button>
                    </form>
                </div>
                {
                    trackstate && details ? <div className='OutputResult'>
                        <div className='OutputTrackContent'>
                            <ol className='outputTrack'>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ol>
                            <div id='content'>
                                <div className="track-list">
                                    <ul>
                                        {trackstate.length !== 0 ? (
                                            trackstate.map((cont, index) => (
                                                <li key={index}>
                                                    {cont.status ? (
                                                        <i className="fa-solid fa-check" style={{ color: 'green' }}></i>
                                                    ) : (
                                                        <i className="fa-regular fa-circle-dot" style={{ color: "#baba0a" }}></i>
                                                    )}
                                                    {cont.content}
                                                </li>
                                            ))
                                        ) : (
                                            <p>Track not available</p>
                                        )}
                                    </ul>
                                </div>
                                <div className="qr-container">
                                    <QRCode size={200} bgColor='white' fgColor='black' value={`${productID}`} />
                                </div>
                            </div>
                        </div>
                        {details ? <div className='ProdDetails'>
                            <div>
                                <h4>Product Name:</h4>
                                <p>{details.Pname}</p>
                            </div>
                            <div>
                                <h4>Product ID:</h4>
                                <p>{details.productID}</p>
                            </div>
                            <div>
                                <h4>Manufacturer Name:</h4>
                                <p>{details.ManuName}</p>
                            </div>
                            <div>
                                <h4>Manufacturer Address:</h4>
                                <p>{details.creator}</p>
                            </div>
                            <div>
                                <h4>Creation Date:</h4>
                                <p>{details.date}</p>
                            </div>
                        </div> : "An error occured"}
                    </div> :
                        <div className='OutputResult' style={{ height: "400px" }}></div>
                }
            </div>
        </>
    )
}
