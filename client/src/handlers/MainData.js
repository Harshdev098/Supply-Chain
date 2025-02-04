export const handleFetchData=async()=>{
    const token=localStorage.getItem("token")
    const query={
        query:`
            query{
                FetchMainData{
                    count
                }
            }
        `
    }
    try{
        const response=await fetch('http://localhost:4000/graphql',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify(query)
        })
        if(response.ok){
            const result=await response.json()
            if(result.data.FetchMainData){
                return result.data.FetchMainData.count;
            }
        }
    }catch(err){
        alert("Internal server occured")
    }
}