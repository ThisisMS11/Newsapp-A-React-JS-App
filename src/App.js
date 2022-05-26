import './App.css';
import React, { useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Footer from './components/Footer';

const App = (props) => {
  let pageSize = 3;

  let apiKey = process.env.REACT_APP_NEWS_API

  // apiKey ='c60a74e3718842d8b3a4dc32ad0062f2'

  const [progress, setprogress] = useState(0)


  //! to use setState we have to use an arrow function instead of function_name(params){}


  return (

    <div>
      <BrowserRouter>

        <Navbar />
        <LoadingBar
          color='#f11946'
          height={3}
          progress={progress}
        />

        <Routes>
          <Route exact path="/business" element={<News setprogress={setprogress}
            apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" color='warning' />}>
          </Route>

          <Route exact path="/entertainment" element={<News setprogress={setprogress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" color='danger' />}></Route>

          <Route exact path="/general" element={<News setprogress={setprogress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" color='primary' />}></Route>

          <Route exact path="/science" element={<News setprogress={setprogress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" color='info' />}></Route>

          <Route exact path="/health" element={<News setprogress={setprogress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" color='success' />}></Route>

          <Route exact path="/sports" element={<News setprogress={setprogress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" color='danger' />}></Route>

          <Route exact path="/technology" element={<News setprogress={setprogress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" color='info' />}></Route>
        </Routes>

        <Footer />



      </BrowserRouter>

      {/* when i am navigating our news component is not getting remounted  i want to remount the newscomponent with updated props for different categories because react will think like if the component is already there and what is the need to update it more i.e. it is being lazy to resolve that issue we have to use key with each route element */}
    </div>
  )

}

export default App




