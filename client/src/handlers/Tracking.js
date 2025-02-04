export const handleTracking = async (state, number) => {
    try {
        const TrackContent = []
        const trackingResult = await state.contract.Track(number)
        console.log("tracking result is ", trackingResult)
        if (trackingResult.length !== 0) {
            if (trackingResult.length >= 1) {
                TrackContent.push({ status: trackingResult[0][1], content: `The Manufacturer ${`${trackingResult[0][0].slice(0,7)}...${trackingResult[0][0].slice(36)}`} have added the Product` })
            }
            for (let i = 1; i < trackingResult.length; i++) {
                if (trackingResult[i][1] === true) {
                    TrackContent.push({ status: true, content: `${trackingResult[i][0].slice(0,7)}...${trackingResult[i][0].slice(36)} has been added in the chain and the delivery has been accepted` })
                }
                else {
                    TrackContent.push({ status: false, content: `${trackingResult[i][0].slice(0,7)}...${trackingResult[i][0].slice(36)} has been added in the chain and the delivery confirmation pending` })
                }
            }
        }
        return { trackingResult, TrackContent };
    } catch (err) {
        console.log("an error occured while tracking ", err)
        alert("Internal server error occured")
        return { trackingResult: null, TrackContent: [] }
    }
}