import React, {Component} from 'react';

import {CONTRACTS_PATH, DASHBOARD_PATH, KEYS_PATH} from "../constants";
import {NavLink} from "react-router-dom";


class DashboardMenu extends Component {
    render() {
        return (
            <aside className="menu">
                <ul className="menu-list">
                    <li>
                        <NavLink activeClassName={'is-active'} exact strict to={DASHBOARD_PATH}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={'is-active'} to={KEYS_PATH}>Keys</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={'is-active'} to={CONTRACTS_PATH}>Contracts</NavLink>
                    </li>
                </ul>
            </aside>
        );
    }
}

export default DashboardMenu;
