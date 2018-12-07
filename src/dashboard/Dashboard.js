import React, {Component} from 'react';
import DashboardMenu from "./DashboardMenu";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {ROOT_PATH} from "../constants";
import LoginPage from "../users/LoginPage";


class Dashboard extends Component {
    render() {
        return (
            <div>
                <section className="section">
                    <div className="columns">
                        <div className="column is-one-fifth">
                            <DashboardMenu />
                        </div>
                        <div className="column is-four-fifths">
                            <Router>
                                <div>
                                    <Route path={ROOT_PATH} component={LoginPage}/>
                                </div>
                            </Router>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Dashboard;
