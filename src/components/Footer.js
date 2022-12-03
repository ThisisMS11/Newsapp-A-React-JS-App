import React from 'react'

const Footer = () => {
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
export default Footer
