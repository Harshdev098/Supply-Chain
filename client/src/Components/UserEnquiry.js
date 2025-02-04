import React, { useContext, useState } from 'react'
import PageHead from './PageHead'
import { useLocation, useSearchParams } from 'react-router-dom'
import MetamaskContext from '../Context/metamask'

export default function UserEnquiry() {
    const location = useLocation()
    const locationElement = location.pathname.split("/")
    const ProdID = parseInt(locationElement[locationElement.length - 1], 10);

    const [searchParams] = useSearchParams()
    const address = searchParams.get("add")
    const { state } = useContext(MetamaskContext)
    const [statement, setStatement] = useState(null)
    console.log("state",state,state.account)

    const SubmitReport = async (e) => {
        e.preventDefault()
        const query = {
            query: `
                mutation{
                    SubmitComplient(ProdID:${ProdID},UserID:"${state.account}",ManuID:"${address}",statement:"${statement}"){
                        status
                    }
                }
            `
        }
        try {
            const response = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            })
            const result = response && await response.json()
            if (response.ok && result.data.SubmitComplient.status===200) {
                alert("Report submitted")
            }
            else {
                alert('an error occured')
            }
        } catch (err) {
            alert("an error occured")
        }
    }

    return (
        <>
            <PageHead heading={'User Enquiry'} para={'User Enquiries by your users are listed below'} />
            <form onSubmit={SubmitReport}>
                <p>{ProdID}</p>
                <input type="text" placeholder='Enter the report' onChange={(e) => { setStatement(e.target.value) }} />
                <button>Submit Report</button>
            </form>
        </>
    )
}
