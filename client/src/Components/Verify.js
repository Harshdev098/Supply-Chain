import React, { useContext, useRef, useState } from 'react'
import QrScanner from 'qr-scanner'
import { handleVerification } from '../handlers/productVerification'
import { handleFetchDetails } from '../handlers/AddProduct'
import { handleTracking } from '../handlers/Tracking'
import MetamaskContext from '../Context/metamask'
import Correct from '../correct.png'
import Wrong from '../wrong.webp'
import { useNavigate } from 'react-router-dom'


export default function Verify() {
    const navigate=useNavigate()
    const videoRef = useRef()
    const [qrResult, setQrResult] = useState(null)
    const scannerRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [trackstate, setTrackState] = useState([])
    const [details, setDetails] = useState(null)
    const { state, handleConnection } = useContext(MetamaskContext)
    const [verificationStatus, setVerificationStatus] = useState(null)
    const [connection, setConnection] = useState(false)

    const VerifyProduct = async () => {
        if (state.contract) {
            if (videoRef.current) {
                try {
                    scannerRef.current = new QrScanner(
                        videoRef.current,
                        async (result) => {
                            setQrResult(result.data);
                            console.log("scannned result data", result.data)
                            scannerRef.current.stop();
                            let status = await handleVerification(state, result.data)
                            setVerificationStatus(status)
                            const { trackingResult, TrackContent } = await handleTracking(state, result.data)
                            console.log("result of tracking is ", TrackContent)
                            setTrackState(TrackContent)
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
                    alert("an error occured")
                }
            }
        }
        else {
            alert("Wallet not connected")
        }

    }

    const ConnectMetamask = async () => {
        if (connection === false) {
            try {
                await handleConnection()
                setConnection(true)
                const MetamaskLi = document.getElementById('MetamaskLi')
                MetamaskLi.style.display = 'none'
            } catch (err) {
                console.log("an error occured while connecting metamask")
                setConnection(false)
            }
        } else {
            alert("Already connected")
        }
    }

    const printSection = () => {
        let sectionPrint = document.getElementById('sectionPrint');
        let qrImage = document.getElementById('qrImage');

        if (!sectionPrint || !qrImage) {
            console.error("Elements not found for printing");
            return;
        }

        let printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(`<p>Print Time ${Date.now()}</p>`);
        printWindow.document.write(qrImage.outerHTML);
        printWindow.document.write(sectionPrint.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    };

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
                        <button type='button' onClick={VerifyProduct}>Scan QR & Verify</button>
                        <button type='button' onClick={() => { scannerRef.current.stop() }}>Cancel</button>
                    </form>
                </div>
                {
                    trackstate && details && <div className='OutputResult'>
                        <div style={{ float: 'right' }}>
                            <button onClick={printSection} style={{ backgroundColor: 'black', color: 'white', fontSize: '14px', padding: '5px', margin: '8px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Print Section</button>
                        </div>
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
                                <div className="qr-container" id="qrImage">
                                    {
                                        verificationStatus === true ? <img src={Correct} alt="" width={"100px"} /> : <img src={Wrong} alt="" width={"100px"} />
                                    }
                                </div>
                            </div>
                        </div>
                        {details ? <div className='ProdDetails' id='sectionPrint'>
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
                            <button onClick={()=>{navigate(`/report/${qrResult}?flag=${verificationStatus}&add=${details.creator}`)}}>Report Product</button>
                        </div> : "An error occured"}
                    </div>
                }
            </div>

        </>
    )
}
