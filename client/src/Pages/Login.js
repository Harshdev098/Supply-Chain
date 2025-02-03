import React, { useRef, useContext, useState } from 'react';
import MetamaskContext from '../Context/metamask';
import LoginContext from '../Context/LoginContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const useMetamask = useContext(MetamaskContext)
  const useLoginCredential=useContext(LoginContext)
  const navigate=useNavigate()
  const email = useRef();
  const name = useRef();
  const oid = useRef();
  const number = useRef();
  const password = useRef();
  const option = useRef();
  const Loginoption = useRef()
  const LoginPassword = useRef()
  const [loginBox, setLoginBox] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metamaskID = await useMetamask.handleConnection()
    console.log("metamask id is: ", metamaskID)

    console.log('Inputs are: ', name.current.value, oid.current.value, option.current.value);

    const graphqlQuery = {
      query: `
          mutation {
              Register(
                  name: "${name.current.value}",
                  oid: "${oid.current.value}",
                  email: "${email.current.value}",
                  contact: "${number.current.value}",
                  password: "${password.current.value}",
                  metamaskID: "${metamaskID}",
                  option: "${option.current.value}"
              ) {
                  status,
                  token,
                  occurance
              }
          }
      `
    };
    await useLoginCredential.handleSignup(graphqlQuery);
  };

  const LoginMetamask = async (e) => {
    e.preventDefault()
    await useMetamask.handleConnection();
    setLoginBox(true);
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    const metamaskID = useMetamask.state.account
    console.log("metamask id during login: ", metamaskID, LoginPassword.current.value)
    const LoginArgs = {
      query: `
        mutation{
          Login(option:"${Loginoption.current.value}",password:"${LoginPassword.current.value}",metamaskID:"${metamaskID}"){
            status
            token
            occurance
          }
        }
      `
    }
    const result=await useLoginCredential.handleLoginWithMetamask(LoginArgs)
    setLoginBox(false)
    if(result.NavigationStatus===true){
      navigate(`/main/${result.occurance}`);
    }
  }

  return (
    <>
      {
        loginBox && <div className='loginBox'>
          <form onSubmit={handleLogin}>
            <label>Enter Password of your account</label>
            <input type="password" required ref={LoginPassword} />
            <button>Login</button>
          </form>
        </div>
      }
      <section className='loginContainer'>
        <div className='loginContent'>
          <div className='loginContentInner'>
            <h2 style={{ fontSize: '2.1rem', padding: '0px', margin: "6px" }}>
              Decentralize your Product supply chain with safety
            </h2>
            <p style={{ fontSize: '19px', marginLeft: '12px' }}>
              ChainX leverages cutting-edge blockchain technology to revolutionize how supply chains operate.
              We ensure your products move with transparency, authenticity, and efficiency from start to finish.
            </p>
          </div>
        </div>
        <div className='loginForm'>
          <h3 style={{ fontSize: '34px' }}>SignIn</h3>
          <div className='loginBtn'>
            <form onSubmit={LoginMetamask}>
              <select name="optionName" id="optionName" required ref={Loginoption}>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Wholeseller">Wholeseller</option>
                <option value="Retailer">Retailer</option>
              </select>
              <button type="submit">Login with Metamask</button>
            </form>
          </div>
          <p style={{ fontSize: "14px", textAlign: 'center' }}>Don't have an account?</p>
          <form onSubmit={handleSubmit}>
            <select name="optionName" id="optionName" required ref={option}>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Wholeseller">Wholeseller</option>
              <option value="Retailer">Retailer</option>
            </select>
            <input type="text" placeholder='Enter Organization Name' required ref={name} />
            <input type="text" placeholder='Enter Organization registration Number' required ref={oid} />
            <input type="email" placeholder='Enter Organization email ID' required ref={email} />
            <input type="number" placeholder='Enter Organization Contact Number' required ref={number} />
            <input type="password" placeholder='Enter your password' required ref={password} />
            <button type='submit'>Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
