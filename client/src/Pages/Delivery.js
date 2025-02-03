import React, { useContext, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'
import Navbar from '../Components/Navbar'
import MetamaskContext from '../Context/metamask'
import { handleAcceptDelivery } from '../handlers/ProductDelivery'
import { handleTracking } from '../handlers/Tracking'
import { handleFetchDetails } from '../handlers/AddProduct'
import Correct from '../correct.png'


export default function Delivery() {
    const { state } = useContext(MetamaskContext)
    const videoRef = useRef()
    const [qrResult, setQrResult] = useState(null)
    const scannerRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [trackstate, setTrackState] = useState([])
    const [details, setDetails] = useState(null)

    const ScanQR=async()=>{
        if (videoRef.current) {
            try {
                scannerRef.current = new QrScanner(
                    videoRef.current,
                    async (result) => {
                        setQrResult(result.data);
                        console.log("scannned result data", result.data)
                        scannerRef.current.stop();
                        await TrackProduct(result.data)
                        const projDetails = await handleFetchDetails(state, result.data)
                        setDetails(projDetails)
                    },
                    { returnDetailedScanResult: true }
                );

                scannerRef.current.start().then(() => {
                    console.log("Camera started successfully");
                    setErrorMessage("");
                }).catch((err) => {
                    console.error("Camera access denied:", err);
                    setErrorMessage("Camera access was denied. Please enable it in browser settings.");
                });
            } catch (err) {
                console.log("an error occured")
            }
        }
    }

    const AcceptDelivery = async () => {
        await handleAcceptDelivery(state,qrResult)
    }

    const TrackProduct = async (projID) => {
        if (state.contract) {
            console.log("qrResult is",qrResult)
            const { trackingResult, TrackContent } = await handleTracking(state, projID)
            console.log("result of tracking is ", TrackContent)
            setTrackState(TrackContent)
        }
    }

    return (
        <>
            <Navbar />
            <div className='sellPageContainer'>
                <div className='sellForm'>
                    <form>
                        {errorMessage ? (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                        ) : (
                            <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }}></video>
                        )}
                        <button type='button' onClick={ScanQR}>Scan QR & Accept</button>
                        <button type='button' onClick={() => { scannerRef.current.stop() }}>Cancel</button>
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
                                    <img src={Correct} alt="" width={"100px"} />
								</div>
							</div>
                    </div>
                    {details ? <div className='ProdDetails'>
                        <div>
                            <h4>Product Name</h4>
                            <p>{details.Pname}</p>
                        </div>
                        <div>
                            <h4>Product ID</h4>
                            <p>{details.productID}</p>
                        </div>
                        <div>
                            <h4>Manufacturer Name</h4>
                            <p>{details.ManuName}</p>
                        </div>
                        <div>
                            <h4>Manufacturer Address</h4>
                            <p>{details.creator}</p>
                        </div>
                        <div>
                            <h4>Creation Date</h4>
                            <p>{details.date}</p>
                        </div>
                        <button onClick={AcceptDelivery}>Accept Delivery</button>
                    </div> : "An error occured"}
                </div> :
                <div className='OutputResult' style={{height:"400px"}}></div>
                }
            </div>
        </>
    )
}
