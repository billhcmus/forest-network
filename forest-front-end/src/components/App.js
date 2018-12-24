import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PrivateRoute} from "./private-route";

import Layout from "./layout";
import LoginAndSignUp from "../containers/authentication";

class App extends Component {
  render() {
    return (
	    <Router>
				<Switch>
					<Route exact path={"/"} component={LoginAndSignUp}/>
					<PrivateRoute exact path={"/home"} component={Layout}/>
					<PrivateRoute exact path={"/:id"} component={Layout}/>
				</Switch>
	    </Router>
    );
  }
}

export default App;