import * as Web3 from 'web3'
import { OpenSeaSDK, Network } from 'opensea-js'
import { PROVIDER_URL, API_KEY } from "../Config/opensea"
import { PRODUCTION } from "../Config"

import PrivateKeyProvider from"truffle-privatekey-provider";

// This example provider won't let you make transactions, only read-only calls:
const provider = new Web3.providers.HttpProvider(PROVIDER_URL)

export const getOpenseaSdk = (provider) => {

  const ethereum = new PrivateKeyProvider(
    "c7990213c3f5af84d442941c6074fde917d10f88057b1316b7c9b31d73b9f909",
    "https://rinkeby.infura.io/v3/f92643868907402a93a47b0f6b551ccc"
  );

  console.log("***********", ethereum, provider)

  const openseaSDK = new OpenSeaSDK(provider, {
    networkName: PRODUCTION ? Network.Main : Network.Rinkeby,
    apiKey: API_KEY
  })
  return openseaSDK;
}