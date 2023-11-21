// Import RESTDataSource from Apollo Server to create data source class 
const { RESTDataSource } = require("apollo-datasource-rest");

// Define constant with Vitalik's Ethereum address we will use in queries
const eth_address = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

// Extend base RESTDataSource class for Etherscan API
class EtherDataSource extends RESTDataSource {
  // Set base URL for Etherscan API endpoints
  constructor() {
    super();
    this.baseURL = "https://api.etherscan.io/api";
  }

  async etherBalanceByAddress() {
    return this.get(
      `?module=account&action=balance&address=${eth_address}&tag=latest&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async totalSupplyOfEther() {
    // Get total supply of Ether
    return this.get(
      `?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getLatestEthereumPrice() {
    // Get latest Ethereum price
    return this.get(
      `?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API}`
    );
  }

  async getBlockConfirmationTime() {
    // Get block confirmation time
    return this.get(
      `?module=gastracker&action=gasestimate&gasprice=2000000000&apikey=${process.env.ETHERSCAN_API}`
    );
  }
}

// Export EtherDataSource class
module.exports = EtherDataSource;