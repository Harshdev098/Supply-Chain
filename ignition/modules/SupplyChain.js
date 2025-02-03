const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SupplyChain", (m) => {

  const contract = m.contract("Supply");

  return { contract };
});
