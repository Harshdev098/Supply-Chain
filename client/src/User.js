import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from './Pages/Main'
import ListProducts from "./Components/ListProducts";
import BuyerList from "./Components/BuyerList";
import UserEnquiry from "./Components/UserEnquiry";
import SellProducts from "./Pages/SellProducts";
import Track from "./Pages/Track";
import ProductDetails from "./Pages/ProductDetails";
import Delivery from './Pages/Delivery';

export default function User() {
    return (
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path="/product/list" element={<ListProducts />} />
                <Route path='/acceptDelivery' element={<Delivery />} />
                <Route path="/buyerList" element={<BuyerList />} />
                <Route path="/enquiry" element={<UserEnquiry />} />
                <Route path="/sell" element={<SellProducts />} />
                <Route path="/track" element={<Track />} />
                <Route path="/productDetails/:id" element={<ProductDetails />} />
            </Routes>

    )
}
