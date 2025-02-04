import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useLocation } from 'react-router-dom'
import MetamaskContext from '../Context/metamask'
import { handleFetchDetails } from '../handlers/AddProduct'

export default function ProductDetails() {
    const location = useLocation()
    const path = location.pathname.split('/')
    const pathElement = path[path.length - 1]
    const { state,handleConnection } = useContext(MetamaskContext)
    const [details, setDetails] = useState(null)

    useEffect(()=>{
        handleConnection()
    },[])

    useEffect(() => {
        const fetchDetails = async () => {
            const projDetails = await handleFetchDetails(state, pathElement)
            setDetails(projDetails)
        }
        if (state.contract) {
            fetchDetails()
        }
    }, [state.contract])
    return (
        <>
            <Navbar />
            {details ? <div className='ProductDetails'>
                <h3 style={{ fontSize: "26px" }}>{details.Pname}</h3>
                <div className='ProdDetails' style={{backgroundColor:"white",borderRadius:"12px"}}>
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
                </div>
            </div> : "An error occured"}
        </>
    )
}
