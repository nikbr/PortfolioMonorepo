require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { MNEMONIC, INFURA_KEY } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider({
           mnemonic:MNEMONIC,
      providerOrUrl:`https://sepolia.infura.io/v3/${INFURA_KEY}`,
      pollingInterval: 8000          // 1 request / 8 s
    }),
      network_id: 11155111, // Sepolia
      deploymentPollingInterval: 8000,
  networkCheckTimeout:       100000
      
    }
  },
  compilers: {
    solc: {
      version: "0.8.19"
    }
  }
};