import React, { useEffect } from "react"
import { store, useGlobalState } from "state-pool"
import { Routes, Route, useLocation } from "react-router-dom"

import NFTPage from "./Pages/NFT"

import "./assets/css/App.css";

import StoreData from "./store"
import { getOpenseaCollection } from "./Api/opensea"

Object.keys(StoreData).map((key) => {
  store.setState(key, StoreData[key])
  return true
})

function App() {
  const [navExpand] = useGlobalState('navExpand')
  const [, , updateSideBarActive] = useGlobalState('sideBarActive')
  const [, , updateOpenseaCollections] = useGlobalState('openseaCollections')
  const [loading] = useGlobalState('loading')
  const location = useLocation();
  useEffect(() => {
    updateSideBarActive((old) => { return location.pathname })
  }, [updateSideBarActive, location])

  useEffect(() => {
    
  }, [])

  return (
    <div className="App" style={loading ? {overflow: 'hidden', height: '95vh'} : {}}>
      <Routes>
        <Route path="/" element={ <NFTPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
