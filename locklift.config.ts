import { LockliftConfig } from "locklift";
import { FactorySource } from "./build/factorySource";
import "@broxus/locklift-deploy";
import { Deployments } from "@broxus/locklift-deploy";
import * as dotenv from "dotenv";

dotenv.config();

declare module "locklift" {
  //@ts-ignore
  export interface Locklift {
    deployments: Deployments<FactorySource>;
  }
}

declare global {
  const locklift: import("locklift").Locklift<FactorySource>;
}

const LOCAL_NETWORK_ENDPOINT = process.env.NETWORK_ENDPOINT || "http://localhost/graphql";

const VENOM_TESTNET_ENDPOINT = process.env.VENOM_TESTNET_ENDPOINT || "https://jrpc-devnet.venom.foundation/";

// Create your own link on https://dashboard.evercloud.dev/

const config: LockliftConfig = {
  compiler: {
    // Specify path to your TON-Solidity-Compiler
    // path: "/mnt/o/projects/broxus/TON-Solidity-Compiler/build/solc/solc",

    // Or specify version of compiler
    version: "0.70.0",

    // Specify config for extarnal contracts as in exapmple
    // externalContracts: {
    //   "node_modules/broxus-ton-tokens-contracts/build": ['TokenRoot', 'TokenWallet']
    // }
  },
  linker: {
    // Specify path to your stdlib
    // lib: "/mnt/o/projects/broxus/TON-Solidity-Compiler/lib/stdlib_sol.tvm",
    // // Specify path to your Linker
    // path: "/mnt/o/projects/broxus/TVM-linker/target/release/tvm_linker",

    // Or specify version of linker
    version: "0.18.4",
  },
  networks: {
    locklift: {
      connection: {
        id: 1001,
        // @ts-ignore
        type: "proxy",
        // @ts-ignore
        data: {},
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        // phrase: "action inject penalty envelope rabbit element slim tornado dinner pizza off blood",
        amount: 20,
      },
    },
    main: {
      // Specify connection settings for https://github.com/broxus/everscale-standalone-client/
      connection: {
        id: 1,
        type: 'graphql',
        group: 'mainnet',
        data: {
          endpoints: [ process.env.MAINNET_NETWORK_ENDPOINT ?? '' ],
        },
      },
      // This giver is default Wallet
      giver: {
        address: process.env.MAINNET_GIVER_ADDRESS ?? '',
        phrase: process.env.MAINNET_GIVER_SEED ?? '',
        accountId: 0,
      },
      keys: {
        // Use everdev to generate your phrase
        // !!! Never commit it in your repos !!!
        phrase: process.env.MAINNET_GIVER_SEED ?? '',
        amount: 20,
      },
    },
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;
