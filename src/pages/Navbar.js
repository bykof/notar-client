import React, {Component} from 'react';

import classNames from 'classnames';

import {NavLink, Link} from "react-router-dom";
import {LOGIN_PATH, REGISTER_PATH, ROOT_PATH} from "../constants";


class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mobile_is_active: false
        };

        this.toggle_mobile_is_active = this.toggle_mobile_is_active.bind(this);
    }

    toggle_mobile_is_active() {
        this.setState({mobile_is_active: !this.state.mobile_is_active});
    }

    render() {
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <NavLink className="navbar-item" to={ROOT_PATH}>
                        Notar
                    </NavLink>

                    <a
                        role="button"
                        className={classNames('navbar-burger', 'burger', {'is-active': this.state.mobile_is_active})}
                        onClick={this.toggle_mobile_is_active}
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample">
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </a>
                </div>

                <div className={classNames('navbar-menu', {'is-active': this.state.mobile_is_active})}>
                    <div className="navbar-start">
                        <NavLink to={ROOT_PATH} className="navbar-item" activeClassName="selected">
                            Home
                        </NavLink>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link
                                    to={REGISTER_PATH}
                                    className="button is-text"
                                >
                                    Sign up
                                </Link>
                                <Link
                                    to={LOGIN_PATH}
                                    className="button"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
