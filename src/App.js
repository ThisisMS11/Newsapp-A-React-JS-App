import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Footer from './components/Footer';

export default class App extends Component {
  pageSize = 3;

  apiKey =process.env.REACT_APP_NEWS_API
  
  // apiKey ='c60a74e3718842d8b3a4dc32ad0062f2'
  state = {
    progress: 0
  }

  //! to use this.setState we have to use an arrow function instead of function_name(params){}
  setprogress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    return (

      <div>
        <BrowserRouter>

          <Navbar />
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />

          <Routes>
            <Route exact path="/business" element={<News setprogress={this.setprogress} 
            apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" color='warning' />}>
            </Route>

            <Route exact path="/entertainment" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" color='danger' />}></Route>

            <Route exact path="/general" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" color='primary' />}></Route>

            <Route exact path="/science" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" color='info' />}></Route>

            <Route exact path="/health" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" color='success' />}></Route>

            <Route exact path="/sports" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" color='danger' />}></Route>

            <Route exact path="/technology" element={<News setprogress={this.setprogress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" color='info' />}></Route>
          </Routes>

          <Footer />



        </BrowserRouter>

        {/* when i am navigating our news component is not getting remounted  i want to remount the newscomponent with updated props for different categories because react will think like if the component is already there and what is the need to update it more i.e. it is being lazy to resolve that issue we have to use key with each route element */}
      </div>
    )
  }
}




