require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    Ganache:{
      url:'HTTP://127.0.0.1:7545',
      accounts:['0xfd87cb60d909746c5888e0963c059f2de691b7a0f6b38ae879e2f093fb20d512']
    }
  },
  paths:{
    artifacts:'./client/src/contracts'
  }
};
