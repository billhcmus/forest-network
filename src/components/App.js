import React, { Component } from 'react';
import Wall from "./Wall";
import Navbar from "./Navbar";
import UserProfile from "./UserProfile";

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
