import React, { Component, useDebugValue } from 'react'

export default class Footer extends Component {
    render() {

        const styles = {
            position: 'absolute',
            top: '85vh',
            left: '40vw',
            marginTop: '50px'
        }

        // replace the text-align with textAlign i.e for each such css property use capital instead of '-'

        return (
            <>
                <div>
                    <div style={styles}>
                        <hr />
                        copyright &copy; 2022 Newsmonkey All rights reserved.
                    </div>
                </div>
            </>
        )
    }
}
