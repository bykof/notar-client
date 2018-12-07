import React, {Component} from 'react';

import {view} from 'react-easy-state';

import userState from '../states/userState';
import Dashboard from "../dashboard/Dashboard";
import AnonymousHomePage from "./AnonymousHomePage";


class HomePage extends Component {
    render() {
        return (
            <div>
                {
                    userState.isLoggedIn ? (
                        <Dashboard/>
                    ) : (
                        <AnonymousHomePage/>
                    )
                }
            </div>
        );
    }
}

export default view(HomePage);
