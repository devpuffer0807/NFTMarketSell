import React from "react"
import { FaSearch } from "react-icons/fa"

const SearchInput = () => {
    return(
        <div style={{display: 'flex', backgroundColor: '#163042', width: 250, height: 35, alignItems: 'center', paddingLeft: 10, borderRadius: 3 }}>
            <FaSearch color="#83919B" size={10}/>
            <input style={{marginLeft: 5, width: 200, height: 22, backgroundColor: '#163042', border: 0, outline: 'none', color: '#fff' }} placeholder={'Search Collections'}/>
        </div>
    )
}

export default SearchInput