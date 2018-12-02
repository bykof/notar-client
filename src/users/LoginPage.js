import React, {Component} from 'react';

import {view} from 'react-easy-state';
import userStore from "../states/userState";
import {Redirect} from "react-router-dom";
import {ROOT_PATH} from "../constants";


class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: '',
            password: '',
            newUser: null,
            redirectAfterLogin: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event) {
        event.preventDefault();
        this.setState({error: null});
        try {
            await userStore.login(this.state.email, this.state.password);
            this.setState({redirectAfterLogin: true});
        } catch (error) {
            this.setState({error: error});
        }
    }

    render() {
        return (
            <section className="section">
                {
                    this.state.error ? (
                        <div className="columns">
                            <div className="column is-half is-offset-one-quarter">
                                <div className="notification is-danger">
                                    {this.state.error.message}
                                </div>
                            </div>
                        </div>
                    ) : null
                }
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter">
                        <form onSubmit={this.onSubmit}>
                            <div className="field">
                                <label htmlFor={'email'}>
                                    Email
                                </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type={'text'}
                                        id={'email'}
                                        name={'email'}
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label htmlFor={'password'}>
                                            Password
                                        </label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type={'password'}
                                                id={'password'}
                                                name={'password'}
                                                value={this.state.password}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-link">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {this.state.redirectAfterLogin ? <Redirect to={ROOT_PATH} /> : null}
            </section>
        );
    }
}

export default view(LoginPage);
