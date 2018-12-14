import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Modal/Login";
import {PrivateRoute} from "./private-route";
import Layout from "./layout";

class App extends Component {
  render() {
    return (
	    <Router>
				<Switch>
					<Route exact path={"/login"} component={Login}/>
					<PrivateRoute exact path={"/"} component={Layout}/>
				</Switch>
	    </Router>
    );
  }
}

export default App;