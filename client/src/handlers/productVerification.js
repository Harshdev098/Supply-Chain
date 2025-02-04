export const handleVerification=async(state,ProdID)=>{
    try{
        const result=await state.contract.verify(ProdID)
    console.log("result of verification ",result)
    return result[1];
    }catch(err){
        alert("An error occured while verification")
    }
}