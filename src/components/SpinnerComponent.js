import React, { Component } from 'react'
import loading from './Spinner.gif'
export default class SpinnerComponent extends Component {
    render() {

        const stylesgif={
            position: 'absolute',
            top:'50vh',
            left:'44vw'
        }
        return (
            <div style={stylesgif}>
                <img src={loading} alt="loading..." />
            </div>
        )
    }
}
