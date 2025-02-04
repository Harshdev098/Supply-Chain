import React, { useRef, useState, useEffect } from 'react'
import PageHead from './PageHead'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react"
import MetamaskContext from '../Context/metamask';
import { AddProduct, showProduct } from '../handlers/AddProduct';
import LoginContext from '../Context/LoginContext';

export default function ListProducts() {
    const PName = useRef()
    const PNumber = useRef()
    const navigate=useNavigate()
    const {loginCredential}=useContext(LoginContext)
    const {state,handleConnection} = useContext(MetamaskContext)
    const [products, setProducts] = useState([])

    useEffect(()=>{
        if(!state.contract){
            handleConnection()
        }
    })

    const RegisterProduct = async (e) => {
        e.preventDefault()
        if (state.contract) {
            await AddProduct(PName.current.value, PNumber.current.value, state);
            const updatedList=await showProduct(state)
            setProducts((list)=>[...list,updatedList])
        }
    }
    const fetchProducts = async () => {
        const list = await showProduct(state)
        setProducts(list)
    }
    useEffect(() => {
        if (state.contract) {
            fetchProducts()
        }
    }, [state.contract])

    return (
        <>
            <PageHead heading={'List Products'} para={'List your Product so that retailer can buy them'} />
            <div className='ProductList'>
                <h3 style={{ fontSize: '30px' }}>Product Details</h3>
                <form onSubmit={RegisterProduct}>
                    <input type="text" placeholder='Your Product Name' ref={PName} />
                    <input type="number" placeholder='Your Product Number' ref={PNumber} />
                    <button type='submit'>Register</button>
                </form>
            </div>
            <div>
                <div className='lists'>
                    <ul>
                        {products.length !== 0
                            ? products.map((prod, index) => (
                                <li key={index}>
                                    <p>{`${prod.name} (${prod.id})`}</p>
                                    <button onClick={()=>{navigate(`/main/${loginCredential.id ? loginCredential.id : localStorage.getItem("UserId")}/productDetails/${prod.id}`)}}>Details</button>
                                </li>
                            ))
                            : <li>No products found</li>}
                    </ul>
                </div>
            </div>
        </>
    )
}
