import React, { useContext, useRef, useState, useEffect } from 'react'
import QrScanner from 'qr-scanner'
import { handleVerification } from '../handlers/productVerification'
import { handleFetchDetails } from '../handlers/AddProduct'
import { handleTracking } from '../handlers/Tracking'
import MetamaskContext from '../Context/metamask'
import SellImage from '../sellImage.jpeg'


export default function Verify() {
    const videoRef = useRef()
    const [qrResult, setQrResult] = useState(null)
    const scannerRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [trackstate, setTrackState] = useState([])
    const [details, setDetails] = useState(null)
    const { state, handleConnection } = useContext(MetamaskContext)

    useEffect(() => {
        if (videoRef.current) {
            try {
                scannerRef.current = new QrScanner(
                    videoRef.current,
                    async (result) => {
                        setQrResult(result.data);
                        console.log("scannned result data", result.data)
                        scannerRef.current.stop();
                        await handleVerification(result.data)
                        await TrackProduct()
                        const projDetails = await handleFetchDetails(result.data)
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

        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop();
            }
        };
    }, []);

    const TrackProduct = async (e) => {
        e.preventDefault()
        if (state.contract) {
            const { trackingResult, TrackContent } = await handleTracking(state, qrResult)
            console.log("result of tracking is ", TrackContent)
            setTrackState(TrackContent)
        }
    }

    const ConnectMetamask = async () => {
        await handleConnection
        const MetamaskLi = document.getElementById('MetamaskLi')
        MetamaskLi.style.display = 'hidden'
    }

    return (
        <>
            <nav className='mainNav'>
                <div>
                    <h1>ChainX</h1>
                </div>
                <div>
                    <ul>
                        <li id='MetamaskLi'><button style={{ fontSize: "19px", padding: '10px', margin: '4px' }} onClick={ConnectMetamask}>Connect Metamask</button></li>
                    </ul>
                </div>
            </nav>
            <div className='sellPageContainer'>
                <div className='sellForm'>
                    <form>
                        {errorMessage ? (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                        ) : (
                            <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }}></video>
                        )}
                        <button type='button' onClick={() => { scannerRef.current.start() }}>Scan QR & Verify</button>
                        <button type='button' onClick={() => { scannerRef.current.stop() }}>Cancel</button>
                    </form>
                </div>
                <div className='OutputResult'>
                    <div className='OutputTrackContent'>
                        <ol className='outputTrack'>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ol>
                        <div id='content'>
                            <ul>
                                {
                                    trackstate.length !== 0 ? trackstate.map((cont, index) => {
                                        return <li key={index}>{cont.status === true ? <i className="fa-solid fa-check" style={{ color: 'green' }}></i> : <i className="fa-regular fa-circle-dot" style={{ color: "#baba0a" }}></i>} {cont.content}</li>
                                    }) : <p>Track not available</p>
                                }
                            </ul>
                            <div>
                                <img src={SellImage} alt="" width={"100px"} />
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
                </div>
            </div>

        </>
    )
}
