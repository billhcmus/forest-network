import React, { Component } from 'react';
import Wall from "./Wall";
import Navbar from "./Navbar";
import ProfileComponent from "./profile-cover/index";
class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <ProfileComponent/>
        <Wall/>
      </div>
    );
  }
}

export default App;
