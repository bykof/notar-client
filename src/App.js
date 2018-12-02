import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import RegisterPage from "./users/RegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./users/LoginPage";
import {LOGIN_PATH, REGISTER_PATH, ROOT_PATH} from "./constants";
import Navbar from "./pages/Navbar";


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
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
