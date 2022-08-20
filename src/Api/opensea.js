import AxiosOpensea from "./opensea-instance"

export const getOpenseaCollection = async () => {
    try{
        const res = await AxiosOpensea.get(`collections?offset=0&limit=10`)
        return res.data.collections
    }catch(e){
        return [];
    }
}

export const getNFTAssetsBySlug = async (slug) => {
    try{
        let res = []
        if(slug === "All"){
            res = await AxiosOpensea.get(`assets?limit=30&include_orders=true`)
        }else{
            res = await AxiosOpensea.get(`assets?collection_slug=${slug}&include_orders=true`)
        }
        return res.data.assets
    }catch(e){
        return []
    }
}

export const getNFTsByOwnerContract = async (walletAddress, collectionAddress) => {
    try{
        let res = []
        res = await AxiosOpensea.get(`assets?owner=${walletAddress}&asset_contract_address=${collectionAddress}&include_orders=${true}&limit=50`)
        return res.data.assets
    }catch(e){
        return []
    }
}

export const getNFTForTest = async () => {
    try{
        const res = await AxiosOpensea.get(`asset/0x6194da6ced35cee92fbfc8f097fa9ea626eee5d7/17`)
        return [res.data]
    }catch(e){
        return []
    }
}

export const getNFTDetailData = async (contract_address, tokenId) => {
    try{
        const res = await AxiosOpensea.get(`asset/${contract_address}/${tokenId}`)
        console.log("===========detail", res)
        return res.data;
    }catch(e){
        return []
    }
}