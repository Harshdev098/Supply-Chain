export const handleAcceptDelivery = async (state, id) => {
    try {
        console.log("state and id in handleAcceptDelivery ",state,id)
        const contract = state.contract ? state.contract : (JSON.parse(localStorage.getItem("metamaskData"))).contract
        await contract.AcceptDelivery(id)
        alert("Delivery Accepted for ", id)
    }catch(err){
        console.log("an error occured while accepting delivery")
    }
}