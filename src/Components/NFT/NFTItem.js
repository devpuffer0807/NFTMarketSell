import React from "react";
import { useNavigate } from "react-router-dom";
import { getOpenseaSdk } from "../../Opensea/sdk";
import { walletConnect } from "../../Util/wallet_connect";
import { useGlobalState } from "state-pool";
import Web3 from "web3";


const NFTItem = ({ index }) => {
    const navigate = useNavigate();
    const [openseaNFTSByCollection, ,] = useGlobalState('openseaNFTSByCollection');
    const [listed, , ] = useGlobalState('listed');
    const [web3Provider, ,] = useGlobalState('web3Provider');
    const [nftSelectedList, , updateNftSelectedList] = useGlobalState('nftSelectedList');

    const buyNFT = async () => {
        console.log("!!!!!!!!!!!!!!!!!!!", openseaNFTSByCollection[index]);
        const assetInfo = openseaNFTSByCollection[index];
        let walletInfo;
        if(web3Provider === null) {
            walletInfo = await walletConnect();
        }

        try{
            const openseaSDK = getOpenseaSdk(walletInfo.provider);

            if(assetInfo.seaport_sell_orders.length > 0){
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

    const nftItemClick = () => {
        updateNftSelectedList((old) => {
            old[index] = !old[index]
            return old;
        })
    }
    
    return (
        listed === "All" ? 
        <div style={{width: 150, height: 170, backgroundColor: '#1A2C38', marginTop: 10, marginRight: 10, padding: 10, borderRadius: 5, borderWidth: nftSelectedList[index] ? 1 : 0, borderColor: '#fff', borderStyle: 'dashed'}} onClick={nftItemClick}>
            <img alt="" src={openseaNFTSByCollection[index].image_url != null ? openseaNFTSByCollection[index].image_url : "https://testnets.opensea.io/static/images/placeholder.png"} style={{width: 150, height: 150, borderRadius: 5, cursor: 'pointer'}} />
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 5}}>
                <span style={{color: '#fff', fontSize: 12}}>{ openseaNFTSByCollection[index].name }</span>
                <span style={{color: 'red', fontSize: 10}}>{ openseaNFTSByCollection[index]?.seaport_sell_orders === null ? "" : (Web3.utils.fromWei(openseaNFTSByCollection[index].seaport_sell_orders[0]?.current_price, "ether") + "ETH") }</span>
            </div>
        </div>
        : (listed === "Listed" && openseaNFTSByCollection[index]?.seaport_sell_orders !== null ? 
            <div style={{width: 150, height: 170, backgroundColor: '#1A2C38', marginTop: 10, marginRight: 10, padding: 10, borderRadius: 5, borderWidth: nftSelectedList[index] ? 1 : 0, borderColor: '#fff', borderStyle: 'dashed'}} onClick={nftItemClick}>
                <img alt="" src={openseaNFTSByCollection[index].image_url != null ? openseaNFTSByCollection[index].image_url : "https://testnets.opensea.io/static/images/placeholder.png"} style={{width: 150, height: 150, borderRadius: 5, cursor: 'pointer'}} />
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 5}}>
                    <span style={{color: '#fff', fontSize: 12}}>{ openseaNFTSByCollection[index].name }</span>
                    <span style={{color: 'red', fontSize: 10}}>{ openseaNFTSByCollection[index]?.seaport_sell_orders === null ? "" : (Web3.utils.fromWei(openseaNFTSByCollection[index].seaport_sell_orders[0]?.current_price, "ether") + "ETH") }</span>
                </div>
            </div> :
            (listed === "Unlisted" && openseaNFTSByCollection[index]?.seaport_sell_orders === null ?
                <div style={{width: 150, height: 170, backgroundColor: '#1A2C38', marginTop: 10, marginRight: 10, padding: 10, borderRadius: 5, borderWidth: nftSelectedList[index] ? 1 : 0, borderColor: '#fff', borderStyle: 'dashed'}} onClick={nftItemClick}>
                    <img alt="" src={openseaNFTSByCollection[index].image_url != null ? openseaNFTSByCollection[index].image_url : "https://testnets.opensea.io/static/images/placeholder.png"} style={{width: 150, height: 150, borderRadius: 5, cursor: 'pointer'}} />
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 5}}>
                        <span style={{color: '#fff', fontSize: 12}}>{ openseaNFTSByCollection[index].name }</span>
                        <span style={{color: 'red', fontSize: 10}}>{ openseaNFTSByCollection[index]?.seaport_sell_orders === null ? "" : (Web3.utils.fromWei(openseaNFTSByCollection[index].seaport_sell_orders[0]?.current_price, "ether") + "ETH") }</span>
                    </div>
                </div> 
                : null
            )
        )
    )
}

export default NFTItem;