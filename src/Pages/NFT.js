import React, { useState, useEffect } from "react";
import { useGlobalState } from "state-pool";
import NFTItem from "../Components/NFT/NFTItem";
import { getNFTsByOwnerContract } from "../Api/opensea";
import { walletConnect } from "../Util/wallet_connect";
import { COLLECTION_ADDRESS } from "../Config/index";
import { getOpenseaSdk } from "../Opensea/sdk";

const NFT = () => {
    const [navExpand] = useGlobalState('navExpand');
    const [width, setWidth] = useState(0);
    const [openseaNFTSByCollection, ,updateOpenseaNFTSByCollection] = useGlobalState('openseaNFTSByCollection');
    const [, , updateLoading] = useGlobalState('loading');
    const [, , updateListed] = useGlobalState('listed');
    const [nftSelectedList, , updateNftSelectedList] = useGlobalState('nftSelectedList');
    const [listed, , ] = useGlobalState('listed');
    const [web3Provider, ,] = useGlobalState('web3Provider');

    useEffect(() => {

        const init = async () => {
            updateLoading(() => {
                return true;
            });
            const walletInfo = await walletConnect();
            const res = await getNFTsByOwnerContract(walletInfo.account, COLLECTION_ADDRESS);
            updateOpenseaNFTSByCollection(() => { return res; });
            updateLoading(() => { return false; });
        }

        init();
    }, [])
  
    useEffect(() => {
        function handleResize() {
            setWidth(window.innerWidth);
        }
        
        window.addEventListener("resize", handleResize);
        
        handleResize();
        
        return () => { 
            window.removeEventListener("resize", handleResize);
        }
    }, [setWidth])

    const listNFT = async (index, price) => {
        console.log("!!!!!!!!!!!!!!!!!!!", openseaNFTSByCollection[index]);
        const assetInfo = openseaNFTSByCollection[index];
        let walletInfo;
        if(web3Provider === null) {
            walletInfo = await walletConnect();
        }

        try{
            const openseaSDK = getOpenseaSdk(walletInfo.provider);

            if(assetInfo.seaport_sell_orders !== null){
                alert("This NFT token has been already listed.");
                return ;
            }
    
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
            updateNftSelectedList((old) => {
                old[index] =false;
                return old;
            });
          }catch(e){
            console.log("##########", e)
          }
    }

    const listNFTs = async () => {
        let listIndex = Object.keys(nftSelectedList);
        let selectedList = [];
        for(var i = 0; i < listIndex.length; i++){
            if(nftSelectedList[listIndex[i]])
                selectedList.push(listIndex[i]);
        }
        if(selectedList.length === 0){
            return alert("Please select NFTs in the list.");
        }
        var price = prompt("Please enter your NFT price in ether.");
        for(var i = 0; i < selectedList.length; i++){
            await listNFT(selectedList[i], price);
        }
        alert("All done");
    }

    return(
        <div className="nft-container" style={{ marginLeft: width > 835 ? (navExpand ? 200 : 100) : 0  }}>
            <div className="nft-fuction-container">
                <div className="nft-sell-button" onClick={listNFTs}>
                    List NFTs
                </div>
                <select onChange={(e) => {
                    updateListed(() => {
                        return e.target.value;
                    });
                    updateNftSelectedList(() => {
                        return {};
                    });
                }}>
                    <option value="All">All</option>
                    <option value={"Listed"}>Listed</option>
                    <option value={"Unlisted"}>Unlisted</option>
                </select>
            </div>
            <div className="nft-content-container">
                {
                    openseaNFTSByCollection.map((item, index) => {
                        return(
                            <NFTItem key={index} index={index}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NFT;