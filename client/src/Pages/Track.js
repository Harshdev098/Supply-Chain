import React, { useContext, useRef, useState,useEffect } from 'react'
import MetamaskContext from '../Context/metamask'
import QRCode from 'react-qr-code'
import QrScanner from 'qr-scanner'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { handleTracking } from '../handlers/Tracking'
import { handleFetchDetails } from '../handlers/AddProduct'

export default function Track() {
    const location = useLocation();
    const requiredPath = location.pathname.split("/")
    const pathElement = requiredPath[requiredPath.length - 2]
    const occurence = pathElement.split("_")[0]

    const videoRef = useRef()
    const [qrResult, setQrResult] = useState(null)
    const scannerRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [trackstate, setTrackState] = useState([])
    const { state,handleConnection } = useContext(MetamaskContext)
    const [details, setDetails] = useState(null)
    const [productID, setProductID] = useState(null)

    useEffect(()=>{
        handleConnection()
    },[])

    const TrackProduct = async () => {
        if (state.contract) {
            const { trackingResult, TrackContent } = await handleTracking(state, productID)
            console.log("result of tracking is ", TrackContent)
            const projDetails = await handleFetchDetails(state, productID)
            setDetails(projDetails)
            setTrackState(TrackContent)
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            try {
                scannerRef.current = new QrScanner(videoRef.current, async (result) => {
                    setQrResult(result.data);
                    console.log("scannned result data", result.data)
                    scannerRef.current.stop();
                    setProductID(result.data)
                    await TrackProduct(result.data)
                    const projDetails = await handleFetchDetails(state, pathElement)
                    console.log("Project details are ", projDetails)
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
            <Navbar />
            <div className='sellPageContainer'>
                <div className='sellForm'>
                    {
                        occurence === "Manufacturer" ? <form>
                            <input type="number" placeholder='Enter the Product Number' onChange={(e)=>{setProductID(e.target.value)}} />
                            <button type='button' onClick={TrackProduct}>Track Product</button>
                        </form> :
                            <form>
                                {errorMessage ? (
                                    <p style={{ color: "red" }}>{errorMessage}</p>
                                ) : (
                                    <video ref={videoRef} style={{ width: "100%", maxWidth: "500px" }}></video>
                                )}
                                <button type='button' onClick={() => { scannerRef.current.start() }}>Scan QR & Sell</button>
                                <button type='button' onClick={() => { scannerRef.current.stop() }}>Cancel</button>
                            </form>
                    }
                </div>
                {
                    trackstate && details ? <div className='OutputResult'>
                        <div style={{float:'right'}}>
							<button onClick={printSection} style={{backgroundColor:'black',color:'white',fontSize:'14px',padding:'5px',margin:'8px',border:'none',borderRadius:'8px',cursor:'pointer'}}>Print Section</button>
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
                                    <QRCode size={200} bgColor='white' fgColor='black' value={`${productID}`} />
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
                        </div> : "An error occured"}
                    </div> :
                        <div className='OutputResult' style={{ height: "400px" }}></div>
                }
            </div>
        </>
    )
}
