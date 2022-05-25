import React, { Component } from 'react'
import Newsitem from './Newsitem'
import SpinnerComponent from './SpinnerComponent';
import PropTypes from 'prop-types'

// news.js is going to be the place where we will put all of our http calls..
export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


    constructor(props) {
        // we use states more often when we have to change the variables at regular intervals without reloading the page again and again while props are more used when is not changing at regualar intervals.
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`

    }


    // now creating an update function to concise our code
    async updatenews() {

        // setting up the progress bar to 0 initially
        this.props.setprogress(10);

        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        // when data is getting fetched for the first time then also we want to show the loading thing
        this.setState({ loading: true })

        let data = await fetch(url);
        this.props.setprogress(30);
        let parsedData = await data.json();
        this.props.setprogress(60);

        

        this.setState({
            articles: parsedData.articles,
            totalresults: parsedData.totalResults,
            loading: false
        })
        this.props.setprogress(100);
    }

    // a async function can wait inside it's body for the resolution of  some of the promises that are going on inside the function body.
    async componentDidMount() {
        this.updatenews();
    }

    handleprevclick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=c60a74e3718842d8b3a4dc32ad0062f2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;


        // this.setState({ loading: true })

        // let data = await fetch(url);
        // let parsedData = await data.json();


        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 });
        this.updatenews();


        // bonus found to know the time of execution between two points in code
        // var start = performance.now();       --> put this at the start point
        // var end = performance.now();         --> put this at the end point
        // console.log(`Execution time: ${end - start} ms`);

    }

    handlenextclick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c60a74e3718842d8b3a4dc32ad0062f2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        // // when loading starts
        // this.setState({ loading: true })
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page: this.state.page + 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })

        this.setState({ page: this.state.page + 1 });
        this.updatenews();
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {

        return (
            <>
                {/* https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81 */}
                <div className="container my-3">
                    <h1 className="text-center " style={{ margin: '25px 0px' }}>Newsmonkey - Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>

                    {/* if loading is true only then show the spinner component. */}

                    {this.state.loading && <SpinnerComponent />}
                    <div className="row">



                        {/* this is a loop for iterating api data  */}
                        {!this.state.loading && this.state.articles.map((e) => {
                            return <div className="col-md-4" key={e.url}>

                                {/* terniary operator was for dealing with the null of title or description */}
                                <Newsitem title={e.title ? e.title.slice(0, 40) : ""} description={e.description ? e.description.slice(0, 88) + '...' : ""} imageurl={!e.urlToImage ? 'https://images.unsplash.com/5/unsplash-kitsune-4.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bc01c83c3da0425e9baa6c7a9204af81' : e.urlToImage} newsurl={e.url}
                                    author={e.author ? e.author : 'Unknown'} date={e.publishedAt} source={e.source.name} color={this.props.color} />

                                {/* understand how color is sent here
                                1. we know the category news is shown with the help of react router.
                                2. so we sent color prop in app.js to news.js where our respective category articles were getting iterated.
                                3. we used this.props.color to gain the respective category color to highlight.
                                */}

                                {/* if author is null then that condition would be considered to be false otherwise true */}
                            </div>

                        })}
                    </div>

                    {/* we have to use this.var_name to access class variables created inside of a class */}
                    <div className="container d-flex justify-content-between my-3">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>	&#8592;previous</button>
                        <button
                            disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize)}
                            type="button" className="btn btn-dark" onClick={this.handlenextclick}>next	&#8594;
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

export default News

// my api key c60a74e3718842d8b3a4dc32ad0062f2