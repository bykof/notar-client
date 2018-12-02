import React, {Component} from 'react';

class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
            newUser: null
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="App">
                <label htmlFor={'email'}>
                    Email:
                </label>
                <input
                    type={'text'}
                    id={'email'}
                    name={'email'}
                    value={this.state.email}
                    onChange={this.onChange}
                />
                <label htmlFor={'password'}>
                    Passwort:
                </label>
                <input
                    type={'password'}
                    id={'password'}
                    name={'password'}
                    value={this.state.email}
                    onChange={this.onChange}
                />
                <label htmlFor={'confirmPassword'}>
                    Passwort nochmal:
                </label>
                <input
                    type={'password'}
                    id={'confirmPassword'}
                    name={'confirmPassword'}
                    value={this.state.email}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default RegisterPage;
