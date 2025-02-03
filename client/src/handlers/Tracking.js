export const handleTracking = async (state, number) => {
    try {
        const TrackContent=[]
        console.log("state in tracking is ", state, number)
        const contract=state.contract ? state.contract : (JSON.parse(localStorage.getItem("metamaskData"))).contract
        const trackingResult = await contract.Track(number)
        console.log("tracking result is ",trackingResult)
        if(trackingResult.length!==0){
            if(trackingResult.length===1){
                TrackContent.push({status:trackingResult[0][1],content:`The Manufacturer ${trackingResult[0][0]} have added the Product`})
            }
            else{
                for(let i=1;i<trackingResult.length;i++){
                    if(trackingResult[i][1]===true){
                        TrackContent.push({status:true,content:`${trackingResult[i][0]} has been added in the chain and the delivery has been accepted`})
                    }
                    else{
                        TrackContent.push({status:false,content:`${trackingResult[i][0]} has been added in the chain and the delivery confirmation pending`})
                    }
                }
            }
        }
        return {trackingResult,TrackContent};
    } catch (err) {
        console.log("an error occured while tracking ", err)
        return {trackingResult:null,TrackContent:[]}
    }
}