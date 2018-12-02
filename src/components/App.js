import React, { Component } from 'react';
import Wall from "./Wall";
import Navbar from "./Navbar";
// import UserProfile from "./UserProfile";
import UserProfile from "../containers/user-profile.js";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <UserProfile/>
        <Wall/>
      </div>
    );
  }
}

export default App;
