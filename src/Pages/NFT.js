import React, { useState, useEffect } from "react";
import { useGlobalState } from "state-pool";
import NFTItem from "../Components/NFT/NFTItem";
import { getNFTAssetsBySlug, getNFTForTest, getNFTsByOwner } from "../Api/opensea";
import { walletConnect } from "../Util/wallet_connect";

const NFT = () => {
    const [navExpand] = useGlobalState('navExpand');
    const [width, setWidth] = useState(0);
    const [openseaNFTSByCollection, ,updateOpenseaNFTSByCollection] = useGlobalState('openseaNFTSByCollection');
    const [, , updateLoading] = useGlobalState('loading');

    useEffect(() => {

        const init = async () => {
            updateLoading(() => {
                return true;
            });
            const walletInfo = await walletConnect();
            const res = await getNFTsByOwner(walletInfo.account);
            updateOpenseaNFTSByCollection(() => { return res; });
            updateLoading(() => { return false; });
        }

        init()
    }, [])
  
    useEffect(() => {
        function handleResize() {
        setWidth(window.innerWidth)
        }
        
        window.addEventListener("resize", handleResize)
        
        handleResize()
        
        return () => { 
        window.removeEventListener("resize", handleResize)
        }
    }, [setWidth])

    return(
        <div className="nft-container" style={{ marginLeft: width > 835 ? (navExpand ? 200 : 100) : 0  }}>
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