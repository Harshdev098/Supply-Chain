import { BrowserProvider } from "ethers";
import { createContext, useState } from "react";
import Supply from "../contracts/contracts/Supply.sol/Supply.json";
import { ethers } from "ethers";

const MetamaskContext = createContext();

export const MetamaskProvider = (props) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    account: null,
  });

  const handleConnection = async () => {
    if(!state.contract){
      try {
        let provider = null,
          accounts = null;
  
        if (window.ethereum) {
          provider = new BrowserProvider(window.ethereum);
          const network = await provider.getNetwork();
          console.log("Network ID is:", network.chainId);
          accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          console.log("Account connected:", accounts[0]);
        } else if (window.web3) {
          provider = new BrowserProvider(window.web3.currentProvider);
        }
  
        const signer = await provider.getSigner();
        console.log("Signer:", signer);
  
        const ContractABI = Supply.abi;
        const ContractAddress = "0xFb4759df4b69DcE4C634B8613ba29AbB0fBf333D";
        const contract = new ethers.Contract(ContractAddress, ContractABI, signer);
        console.log("Contract: ", contract);
  
        setState({
          provider: provider,
          signer: signer,
          contract: contract,
          account: accounts[0],
        });
  
        return accounts[0];
      } catch (err) {
        console.log("an error occured while setting metamask ", err)
      }
    }
  };

  return (
    <MetamaskContext.Provider value={{ state, handleConnection }}>
      {props.children}
    </MetamaskContext.Provider>
  );
};


export default MetamaskContext
