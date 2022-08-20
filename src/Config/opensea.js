import { PRODUCTION, INFRA_KEY } from "./index"

export const API_KEY = PRODUCTION ? "" : ""
export const OPENSEA_API_URL = PRODUCTION ? `https://api.opensea.io/api/v1/` : `https://testnets-api.opensea.io/api/v1/`
export const PROVIDER_URL = PRODUCTION ? `https://mainnet.infura.io/v3/${INFRA_KEY}` : `https://rinkeby.infura.io/v3/${INFRA_KEY}`