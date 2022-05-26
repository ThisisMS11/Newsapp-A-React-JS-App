import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import SpinnerComponent from './SpinnerComponent';
import PropTypes from 'prop-types'

// news.js is going to be the place where we will put all of our http calls..
const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setloading] = useState(false)
    const [page, setpage] = useState(1);
    const [totalresults, settotalresults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`


    // now creating an update function to concise our code
    const updatenews = async () => {

        // setting up the progress bar to 0 initially
        props.setprogress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;


        setloading(true);

        let data = await fetch(url);
        props.setprogress(30);
        let parsedData = await data.json();
        props.setprogress(60);

        setArticles(parsedData.articles)
        settotalresults(parsedData.totalResults)
        setloading(false);

        props.setprogress(100);
    }

    useEffect(() => {
        updatenews()
    }, [])


    const handleprevclick = async () => {

        setpage(page - 1);
        updatenews();


        // bonus found to know the time of execution between two points in code
        // var start = performance.now();       --> put this at the start point
        // var end = performance.now();         --> put this at the end point
        // console.log(`Execution time: ${end - start} ms`);

    }

    const handlenextclick = async () => {
        setpage(page + 1);
        updatenews();
    }

   

    return (
        <>
            {/* https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81 */}
            <div className="container my-3">
                <h1 className="text-center " style={{ margin: '25px 0px' }}>Newsmonkey - Top {capitalizeFirstLetter(props.category)} headlines</h1>

                {/* if loading is true only then show the spinner component. */}

                {loading && <SpinnerComponent />}
                <div className="row">



                    {/* this is a loop for iterating api data  */}
                    {!loading && articles.map((e) => {
                        return <div className="col-md-4" key={e.url}>

                            {/* terniary operator was for dealing with the null of title or description */}
                            <Newsitem title={e.title ? e.title.slice(0, 40) : ""} description={e.description ? e.description.slice(0, 88) + '...' : ""} imageurl={!e.urlToImage ? 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81' : e.urlToImage} newsurl={e.url}
                                author={e.author ? e.author : 'Unknown'} date={e.publishedAt} source={e.source.name} color={props.color} />

                        </div>

                    })}
                </div>

                {/* we have to use var_name to access class variables created inside of a class */}
                <div className="container d-flex justify-content-between my-3">
                    <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handleprevclick}>	&#8592;previous</button>
                    <button
                        disabled={page + 1 > Math.ceil(totalresults / props.pageSize)}
                        type="button" className="btn btn-dark" onClick={handlenextclick}>next	&#8594;
                    </button>
                </div>
            </div>
        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News

// my api key c60a74e3718842d8b3a4dc32ad0062f2