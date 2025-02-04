export const handleAcceptDelivery = async (state, id) => {
    try {
        console.log("state and id in handleAcceptDelivery ",state,id)
        await state.contract.AcceptDelivery(id)
        alert("Delivery Accepted for ", id)
    }catch(err){
        alert('An error occured while accepting delivery')
    }
}