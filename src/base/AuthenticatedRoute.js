import React from 'react';
import {Redirect, Route} from "react-router-dom";

import {view} from 'react-easy-state';

import userStore from '../stores/userStore';
import {LOGIN_PATH} from "../constants";
import Loading from "./Loading";

function AuthenticatedRoute({component: Component, ...rest}) {

    return (
        userStore.isLoading ? (
            <Loading/>
        ) : (
            userStore.isLoggedIn ? (
                <Route
                    {...rest}
                    render={
                        (props) => <Component {...props} />
                    }
                />
            ) : (
                <Redirect to={{pathname: LOGIN_PATH}}/>
            )

        )
    )
}

export default view(AuthenticatedRoute);
