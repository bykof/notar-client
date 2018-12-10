import React, {Component} from 'react';
import DashboardMenu from "./DashboardMenu";
import {Route} from "react-router-dom";
import {CONTRACTS_PATH, DASHBOARD_PATH, KEYS_PATH} from "../constants";
import KeysPage from "./KeysPage";
import Dashboard from "./Dashboard";
import ContractsPage from "./ContractsPage";


class DashboardWrapper extends Component {
    render() {
        return (
            <div>
                <section className="section">
                    <div className="columns">
                        <div className="column is-one-fifth">
                            <DashboardMenu/>
                        </div>
                        <div className="column is-four-fifths">
                            <Route path={DASHBOARD_PATH} strict exact component={Dashboard} />
                            <Route path={KEYS_PATH} component={KeysPage}/>
                            <Route path={CONTRACTS_PATH} component={ContractsPage}/>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default DashboardWrapper;
