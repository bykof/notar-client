import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import RegisterPage from "./users/RegisterPage";
import HomePage from "./base/HomePage";
import LoginPage from "./users/LoginPage";
import {DASHBOARD_PATH, LOGIN_PATH, REGISTER_PATH, ROOT_PATH} from "./constants";
import Navbar from "./base/Navbar";
import DashboardWrapper from "./dashboard/DashboardWrapper";


class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Navbar/>
                        <Route exact path={ROOT_PATH} component={HomePage}/>
                        <Route path={REGISTER_PATH} component={RegisterPage}/>
                        <Route path={LOGIN_PATH} component={LoginPage}/>
                        <Route path={DASHBOARD_PATH} component={DashboardWrapper}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
