import React, { useRef, useContext, useState, useEffect } from 'react'
import QRCode from 'react-qr-code'
import QrScanner from 'qr-scanner'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { handleSellProduct } from '../handlers/AddProduct'
import MetamaskContext from '../Context/metamask'
import { handleTracking } from '../handlers/Tracking'
import { handleFetchDetails } from '../handlers/AddProduct'


export default function SellProducts() {
	const location = useLocation();
	const requiredPath = location.pathname.split("/")
	const pathElement = requiredPath[requiredPath.length - 2]
	const occurence = pathElement.split("_")[0]

	const Number = useRef()
	const buyerAddress = useRef()

	const [trackstate, setTrackState] = useState([])
	const { state,handleConnection } = useContext(MetamaskContext)
	const videoRef = useRef()
	const [qrResult, setQrResult] = useState(null)
	const scannerRef = useRef(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [details, setDetails] = useState(null)
	const [productID, setProductID] = useState(null)

	useEffect(()=>{
		handleConnection()
	},[])

	const sellProduct = async (e) => {
		e.preventDefault()
		await handleSellProduct(Number.current.value, buyerAddress.current.value, state)
		setProductID(Number.current.value)
		await TrackProduct()
		const projDetails = await handleFetchDetails(state, Number.current.value)
		console.log("project details are ", projDetails)
		setDetails(projDetails)
	}

	const TrackProduct = async (e) => {
		if (e) e.preventDefault()
		if (state.contract) {
			const Pnumber = Number.current.value ? Number.current.value : qrResult
			const { trackingResult, TrackContent } = await handleTracking(state, Pnumber)
			console.log("result of tracking is ", TrackContent)
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
					const buyerAddress = prompt("Enter the Buyer Address")
					setProductID(result.data)
					await handleSellProduct(result.data, buyerAddress, state)
					await TrackProduct()
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

	const downloadQRCode = () => {
		const svg = document.querySelector(".qr-container svg"); // Select the QR code SVG
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext("2d");
		const serializer = new XMLSerializer();
		const svgString = serializer.serializeToString(svg);
		const img = new Image();

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			const link = document.createElement("a");
			link.href = canvas.toDataURL("image/png");
			link.download = `QRCode_${productID || "default"}.png`;
			link.click();
		};

		img.src = "data:image/svg+xml;base64," + btoa(svgString);
	};


	return (
		<>
			<Navbar />
			<div className='sellPageContainer'>
				<div className='sellForm'>
					{
						occurence === "Manufacturer" ?
							<form onSubmit={sellProduct}>
								<input type="number" placeholder='Enter the Product Number' ref={Number} />
								<input type="text" placeholder='Enter buyer Address' ref={buyerAddress} />
								<button>Confirm & Sell</button>
							</form>
							:
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
						<div style={{ float: 'right' }}>
							<button style={{ backgroundColor: 'black', color: 'white', fontSize: '18px', padding: '8px', margin: '8px' }}>Print Section</button>
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
								<div className="qr-container">
									<QRCode size={100} bgColor='white' fgColor='black' value={`${productID}`} />
									<button onClick={downloadQRCode} style={{ marginTop: "10px", padding: "8px", fontSize: "14px", cursor: "pointer" }}>
										Download QR Code
									</button>
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
			</div >
		</>
	)
}
