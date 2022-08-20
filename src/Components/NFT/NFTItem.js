import React from "react"
import { useNavigate } from "react-router-dom"

import { getOpenseaSdk } from "../../Opensea/sdk"
import { walletConnect } from "../../Util/wallet_connect"

import { useGlobalState } from "state-pool"


const NFTItem = ({ index }) => {
    const navigate = useNavigate();
    const [openseaNFTSByCollection, ,] = useGlobalState('openseaNFTSByCollection');
    const [web3Provider, ,] = useGlobalState('web3Provider');

    const [orderStatus, setOrderStatus] = React.useState(false);

    const buyNFT = async () => {
        const assetInfo = openseaNFTSByCollection[index];
        let walletInfo
        if(web3Provider === null) {
            walletInfo = await walletConnect()
        }


        try{
            console.log(walletInfo)
            const openseaSDK = getOpenseaSdk(walletInfo.provider)

            const { orders, count } = await openseaSDK.api.getOrders({
                assetContractAddress: assetInfo.asset_contract.address,
                tokenId: assetInfo.token_id,
                side: "ask"
            });

            if(orders.length > 0){
                alert("This NFT token has been already listed.");
                return ;
            }

            var price = prompt("Please enter your NFT price in ether.");
    
           const auction = await openseaSDK.createSellOrder({
                asset: {
                  tokenId: assetInfo.token_id,
                  tokenAddress: assetInfo.asset_contract.address,
                  schemaName: assetInfo.asset_contract.schema_name
                },
                accountAddress: walletInfo.account,
                startAmount: price,
                expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24),
                endAmount: price,
              })

          }catch(e){
            console.log("##########", e)
          }
    }
    return (
        <div style={{width: 150, height: 230, backgroundColor: '#1A2C38', marginTop: 10, marginRight: 10, padding: 10, borderRadius: 5}}>
            <img alt="" src={openseaNFTSByCollection[index].image_url != null ? openseaNFTSByCollection[index].image_url : "https://testnets.opensea.io/static/images/placeholder.png"} style={{width: 150, height: 150, borderRadius: 5, cursor: 'pointer'}} onClick={ () => { 
                navigate("/nft_detail", { state: { index: index } })
             } } />
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 5}}>
                <span style={{color: '#fff', fontSize: 12}}>{ openseaNFTSByCollection[index].name }</span>
                <span style={{color: '#51636F', fontSize: 10}}>$12.5</span>
            </div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: 25, backgroundColor: '#00F2FF', borderRadius: 5, marginTop: 10, cursor: 'pointer'}}
                onClick={buyNFT}
            >
                Sell
            </div>
        </div>
    )
}

export default NFTItem;