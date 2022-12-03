import React, { Component } from 'react'
import loading from './Spinner.gif'
const SpinnerComponent = (props) => {
    const stylesgif = {
        position: 'absolute',
        top: '50vh',
        left: '44vw'
    }
    return (
        <div style={stylesgif}>
            {/* loading is the name of gif */}
            <img src={loading} alt="loading..." />
        </div>
    )
}
export default SpinnerComponent
