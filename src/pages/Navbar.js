import React, {Component} from 'react';

import classNames from 'classnames';
import {view} from 'react-easy-state';
import {NavLink, Link} from "react-router-dom";

import {LOGIN_PATH, REGISTER_PATH, ROOT_PATH} from "../constants";
import userStore from "../states/userState";


class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mobile_is_active: false,
        };

        this.toggle_mobile_is_active = this.toggle_mobile_is_active.bind(this);
    }

    toggle_mobile_is_active() {
        this.setState({mobile_is_active: !this.state.mobile_is_active});
    }

    render() {
        const userIsLoggedIn = userStore.isLoggedIn;
        const loginButton = (
            <Link
                to={LOGIN_PATH}
                className="button"
            >
                Log in
            </Link>
        );

        const registerButton = (
            <Link
                to={REGISTER_PATH}
                className="button is-text"
            >
                Sign up
            </Link>
        );

        const logoutButton = (
            <button
                className="button is-text"
                onClick={userStore.logout}
            >
                Logout
            </button>
        );

        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to={ROOT_PATH}>
                        Notar
                    </NavLink>
                    <span
                        role="button"
                        className={classNames('navbar-burger', 'burger', {'is-active': this.state.mobile_is_active})}
                        onClick={this.toggle_mobile_is_active}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </span>
                </div>

                <div className={classNames('navbar-menu', {'is-active': this.state.mobile_is_active})}>
                    <div className="navbar-start">
                        <NavLink to={ROOT_PATH} className="navbar-item" activeClassName="selected">
                            Home
                        </NavLink>
                    </div>

                    <div className={classNames('navbar-end')}>
                        <div className="navbar-item">
                            <div className="buttons">
                                {!userIsLoggedIn ? registerButton : null}
                                {!userIsLoggedIn ? loginButton : null}
                                {userIsLoggedIn ? logoutButton : null}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default view(Navbar);
