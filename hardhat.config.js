require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load .env file

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ropsten: {
      url: process.env.INFURA_ROPSTEN_URL,
      accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`],
    },
  },
};
