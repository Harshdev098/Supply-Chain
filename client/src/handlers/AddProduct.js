export const AddProduct = async (name, number, state) => {
    console.log("state: ", state)
    try {
        const query = {
            query: `
                    mutation{
                        AddProduct(name:"${name}",creator:"${state.account}",number:"${number}"){
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
            const OnchainResult = await state.contract.addProduct(number, name)
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
        alert("Internal server error occured")
    }
}

export const showProduct = async (state) => {
    try {
        const projectList = await state.contract.showProducts()
        console.log("project list is ", projectList)
        const structuredProducts = projectList.map((prod) => ({
            id: prod[0].toString(),
            name: prod[1],
            owner: prod[2],
        }));
        return structuredProducts;
    } catch (err) {
        console.log("an error occured while showing the products ", err)
        alert("Internal server occured")
    }
}

export const handleSellProduct = async (number, buyerAddress, state) => {
    try {
        const result = await state.contract.DeliverNext(number, buyerAddress)
        console.log("result of handlesellproduct is ", result)
        alert("A new supplier has been added in the chain. Product selled!")
    }catch(err){
        console.log("an error occured while selling in handleSellProduct ",err)
        alert("an error occured while selling product")
    }
}

export const handleFetchDetails = async (state, number) => {
    console.log("number and state ", number, state)
    const grpqhQuery = {
        query: `
            query{
                ProductDetails(id:${number},creator:"${state.account}"){
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
            console.log("details are ",result.data.ProductDetails)
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