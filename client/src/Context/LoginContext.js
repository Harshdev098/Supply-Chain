import { createContext, useState } from "react";

const LoginContext = createContext()

export const LoginProvider = (props) => {
    const [loginCredential, setLoginCredential] = useState({ status: false, id: null })

    const handleSignup=async(graphqlQuery)=>{
        try {
            const response = await fetch('http://localhost:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(graphqlQuery)
            });
            const result = await response.json();
            console.log("response: ", response);
            console.log("result: ", result);
            if (result.data && result.data.Register) {
              const { status, token, occurance } = result.data.Register;
              if (status === "200") {
                if (token) {
                  localStorage.setItem('token', token);
                  console.log("token during register", token);
                  setLoginCredential({status:true,id:occurance})
                  localStorage.setItem('UserId',occurance)
                  localStorage.setItem('LoginStatus',true)
                  alert("Registration Successful");
                  return {NavigationStatus:true,occurance:occurance};
                }
              } else if (status === "500") {
                alert("Internal server error");
                return {NavigationStatus:false,occurance:null};
              } else if (status === "400") {
                alert('User with email or ID already exists');
                return {NavigationStatus:false,occurance:null};
              } else {
                alert('An unexpected error occurred');
                return {NavigationStatus:false,occurance:null};
              }
            } else {
              console.log("No data found in response");
              alert('Unexpected response structure');
              return {NavigationStatus:false,occurance:null};
            }
          } catch (err) {
            console.error('An error occurred:', err);
            alert("An error occurred");
            return {NavigationStatus:false,occurance:null};
          }
      
    }

    const handleLoginWithMetamask = async (LoginArgs) => {
        try {
            const response = await fetch('http://localhost:4000/graphql', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginArgs)
            })
            console.log('response: ', response)
            const result = await response.json()
            if (response.ok && result.data.Login.status === "200") {
                if (result.data.Login.token) {
                    console.log("user from backend is: ", result.data.Login.occurance)
                    localStorage.setItem("token", result.data.Login.token)
                    localStorage.setItem("UserId",result.data.Login.occurance)
                    localStorage.setItem('LoginStatus',true)
                    setLoginCredential({ status: true, id: result.data.Login.occurance })
                    alert("Login Successfull")
                    return {NavigationStatus:true,occurance:result.data.Login.occurance};
                }
            }
            else if (result.data.Login.status === "401") {
                alert('Incorrect Password or id')
                return {NavigationStatus:false,occurance:null};
            }
            else if (result.data.Login.status === "404") {
                alert('User does not exists')
                return {NavigationStatus:false,occurance:null};
            }
            else if (result.data.Login.status === "500") {
                alert('Internal server error')
                return {NavigationStatus:false,occurance:null};
            }
        } catch (err) {
            console.log("an error occured ", err)
            alert("An error occured while Login")
            return {NavigationStatus:false,occurance:null};
        }
    }

    return (
        <LoginContext.Provider value={{ handleLoginWithMetamask, loginCredential, handleSignup }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContext;