import React, {Component} from 'react';

import {view} from 'react-easy-state';
import userStore from "../stores/userStore";
import Loading from "./Loading";


class ShowAnonymous extends Component {
    render() {
        return userStore.isLoading ? (
            <Loading/>
        ) : (
            !userStore.isLoggedIn ? (this.props.children) : null
        )
    }
}

export default view(ShowAnonymous);
