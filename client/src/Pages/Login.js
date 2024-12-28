import React, { useRef, useState } from 'react'

export default function Login() {
    const email=useRef()
    const name=useRef()
    const oid=useRef()
    const number=useRef()
    const option=useRef()
    const password=useRef()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log('inputs are: ',name.current.value,oid.current.value,option.current.value)
        try{
            const response=await fetch('http://localhost:3000/auth/register')
        if(response.ok){
            console.log('signup successfully')
        }
        else if(response.status===401){
            console.log("user already exist")
        }
        else{
            console.log('internal server error')
        }
        }catch(err){
            console.log('an error occured')
        }
    }
    return (
        <>
            <section className='loginContainer'>
                <div className='loginContent'>
                    <div className='loginContentInner'>
                        <h2 style={{ fontSize: '2.1rem', padding: '0px', margin: "6px" }}>Decentrailize your Product supply chain with safety</h2>
                        <p style={{ fontSize: '19px', marginLeft: '12px' }}>ChainX leverages cutting-edge blockchain technology to revolutionize how supply chains operate. We ensure your products move with transparency, authenticity, and efficiency from start to finish.</p>
                    </div>
                </div>
                <div className='loginForm'>
                    <h3 style={{fontSize:'34px'}}>SignIn</h3>
                    <form onSubmit={handleSubmit}>
                        <select name="optionName" id="optionName" required ref={option}>
                            <option value="Manufacturer">Manufacturer</option>
                            <option value="Wholeseller">Wholeseller</option>
                            <option value="Retailer">Retailer</option>
                        </select>
                        <input type="text" placeholder='Enter Organization Name' required ref={name} />
                        <input type="text" placeholder='Enter Organization registration Number' required ref={oid} />
                        <input type="email" placeholder='Enter Organization email ID' required ref={email} />
                        <input type="number" placeholder='Enter Organization Contact Number' required  ref={number}/>
                        <input type="password" placeholder='Enter your password' required  ref={password}/>
                        <button type='submit'>Submit</button>
                    </form>
                    <div className='loginBtn'>
                        <p>Already have an account?</p>
                        <button>Login with Metamask</button>
                    </div>
                </div>
            </section>
        </>
    )
}
