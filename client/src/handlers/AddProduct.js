export const AddProduct = async (name, number, state) => {
    console.log("state: ", state)
    const creator = state.account ? state.account : (JSON.parse(localStorage.getItem("metamaskData"))).account
    const contract = state.contract ? state.contract : (JSON.parse(localStorage.getItem("metamaskData"))).contract
    try {
        const query = {
            query: `
                    mutation{
                        AddProduct(name:"${name}",creator:"${creator}",number:"${number}"){
                            id
                            status
                        }
                    }
                `
        }
        const token = localStorage.getItem('token')
        console.log("the token from local storage ", token)
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(query)
        })
        const result = response && await response.json()
        console.log("result", result)
        if (response.ok && result.data.AddProduct.status === 200) {
            const offchainData = result.data.AddProduct.id
            const OnchainResult = await contract.addProduct(number, name)
            console.log("result from blockchain", OnchainResult)
            alert(`product added ${offchainData}`)
            return
        }
        else {
            console.log("an error occured while registering")
            alert("an error occured while registering")
        }
    } catch (err) {
        console.log("an error occured while adding project", err)
    }
}

export const showProduct = async (state) => {
    try {
        console.log("the state in showProduct function is ", state)
        const contract = state.contract ? state.contract : (JSON.parse(localStorage.getItem("metamaskData"))).contract
        const projectList = await contract.showProducts()
        console.log("project list is ", projectList)
        const structuredProducts = projectList.map((prod) => ({
            id: prod[0].toString(),
            name: prod[1],
            owner: prod[2],
        }));
        return structuredProducts;
    } catch (err) {
        console.log("an error occured while showing the products ", err)
    }
}

export const handleSellProduct = async (number, buyerAddress, state) => {
    try {
        const contract = state.contract ? state.contract : (JSON.parse(localStorage.getItem("metamaskData"))).contract
        console.log("contract in handleSellProduct is ", contract)
        const result = await contract.DeliverNext(number, buyerAddress)
        console.log("result of handlesellproduct is ", result)
        alert("A new supplier has been added in the chain. Product selled!")
    }catch(err){
        console.log("an error occured while selling in handleSellProduct ",err)
        alert("an error occured while selling product")
    }
}

export const handleFetchDetails = async (state, number) => {
    const creator = state.account
    console.log("number and state ", number, state)
    const grpqhQuery = {
        query: `
            query{
                ProductDetails(id:${number},creator:"${creator}"){
                    productID,date,ManuName,Pname,creator,status
                }
            }
        `
    }
    const token = localStorage.getItem("token")
    try {
        const response = await fetch('http://localhost:4000/graphql', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(grpqhQuery)
        })
        const result = response && await response.json()
        if (result.data.ProductDetails.status === 200) {
            const details = result.data.ProductDetails
            return details;
        }
        else {
            console.log("an error occured",result.data.ProductDetails)
            return;
        }
    } catch (err) {
        console.log("an error occured ", err)
        return;
    }
}