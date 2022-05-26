import React, { Component } from 'react'

const Newsitem = (props) => {


    // this is what we call as destructuring the props
    let { title, description, imageurl, newsurl, author, date, source, color } = props;

    // position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger
    let dynamicbadge = `badge bg-${color}`;

    let style_badge = {
        zIndex: '1',
        left: '90%'
    }
    return (
        <div>
            {/* now style is given by passing js object here */}

            <div className="card">

                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                }>


                    <span className={dynamicbadge} style={style_badge}>
                        {source}
                    </span>
                </div>
                <img src={imageurl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">by {author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsurl} target="_blank" className="btn btn-primary">Read more</a>
                </div>
            </div>
        </div>
    )

}

export default Newsitem 