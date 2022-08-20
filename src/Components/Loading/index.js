import React from "react"
import { Audio } from  'react-loader-spinner'

const Loading = () => {
    return (
        <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, top: 0, zIndex: 99999, background: '#1411119e'}}>
            <Audio
                height = "80"
                width = "80"
                radius = "9"
                color = '#fff'
                ariaLabel = 'three-dots-loading'     
                wrapperStyle
                wrapperClass
            />
        </div>
    )
}

export default Loading