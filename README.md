# Contracts for storing onchain sites

Script for deploying Eversite contract.
This contract could store html-sites in the Everscale blockchain.
Sites could be [linked to .ever domains](https://github.com/chumschat/eversite-uploader) 
and accessed via the browser from [Chums](https://chums.chat/) messenger.

This scripts uses npm and node.js. Be sure you have them installed.

## Install dependencies

```shell
npm install
```

## Prepare the environment

`.env` is used to configure these scripts.
You should create it from [.env.template](.env.template) file.
Fill in the fields with your data.

| Field                      | Required | Description                                                    |
|----------------------------|----------|----------------------------------------------------------------|
| `MAINNET_NETWORK_ENDPOINT` | **yes**  | URL of the mainnet GraphQL endpoint                            |
| `MAINNET_GIVER_ADDRESS`    | **yes**  | Giver wallet address: address where gas will be withdrawn from |
| `MAINNET_GIVER_SEED`       | **yes**  | Seed phrase of the giver wallet                                |

This script uses GraphQL transport.
To get the right endpoint url you should visit [evercloud](https://www.evercloud.dev/), register and create a new project.
Then you will get the endpoint url.


## Deploy site contract

After all preparations you could deploy the site contract.
You could use `deploy` feature from locklift.

```shell
npx locklift deploy --network main
```

Or you could run the script:

```shell
npx locklift run --network main --script scripts/1-deploy-site.ts
```

When you use `deploy` feature, locklift will remember the deployed contract address.
If you want to deploy the contract again to a new address, you should remove the `deployments` folder.
When you run the `1-deploy-site.ts` script, you will get a new address and a new deployment every time.

After deploying the contract you will get the contract address, 
which you could fill with the data and link to the .ever domain.
Use [eversite-uploader](https://github.com/chumschat/eversite-uploader) tools for that.
