import React, { Component } from 'react';
import Wall from "./Wall";
import Navbar from "./navbar";
import UserProfile from "../containers/user-profile.js";
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
	    <Router>
	      <div className="Container">
	        <Navbar/>
	        <UserProfile/>
	        <Wall/>
	      </div>
	    </Router>
    );
  }
}

export default App;
