import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_URL_MCH = process.env.API_URL_MCH;
const API_URL_MCH_TEST = process.env.API_URL_MCH_TEST;
const API_URL_ZKKATANA = process.env.API_URL_ZKKATANA;
const API_URL_MUMBAI = process.env.API_URL_MUMBAI;
const API_KEY = process.env.API_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.19',
    settings: {
      viaIR: true,
      optimizer: {
        runs: 200,
        enabled: true,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    local: {
      url: 'http://127.0.0.1:8545/',
      gas: 2100000,
      gasPrice: 8000000000,
      chainId: 31337,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    mch: {
      url: API_URL_MCH,
      chainId: 29548,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    mchTest: {
      url: API_URL_MCH_TEST,
      chainId: 420,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    astarZkKatana: {
      url: API_URL_ZKKATANA,
      chainId: 1261120,
      gas: 2100000,
      gasPrice: 80000000000,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    mumbai: {
      url: API_URL_MUMBAI,
      chainId: 80001,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
  etherscan: {
    apiKey: {
      mchTest: "aaa"
    },
    customChains: [
      {
        network: "mchTest",
        chainId: 420,
        urls: {
          apiURL: "https://explorer.oasys.sand.mchdfgh.xyz/api ",
          browserURL: "https://explorer.oasys.sand.mchdfgh.xyz/"
        }
      }
    ]
  },
};

export default config;
