import React, {Component} from 'react';

import {Auth} from 'aws-amplify';


class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: '',
            password: '',
            confirmPassword: '',
            error: null,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event) {
        event.preventDefault();
        this.setState({error: null});
        try {
            let data = await Auth.signUp(
                {
                    username: this.state.email,
                    password: this.state.password,
                    attributes: {
                        email: this.state.email,
                    },
                }
            );
            console.log('This is my data: ', data);
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
                                    <div className="field">
                                        <label htmlFor={'confirmPassword'}>
                                            Password again
                                        </label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type={'password'}
                                                id={'confirmPassword'}
                                                name={'confirmPassword'}
                                                value={this.state.confirmPassword}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button className="button is-link">Register</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

export default RegisterPage;
