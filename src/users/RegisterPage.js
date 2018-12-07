import React, {Component} from 'react';

import moment from 'moment';

import {Auth} from 'aws-amplify';


class RegisterPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            firstName: '',
            lastName: '',
            birthdayDay: '',
            birthdayMonth: '',
            birthdayYear: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: null,
            birthdayYearOptions: [],
            birthdayMonthOptions: [],
            birthdayDayOptions: [],
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.calculateBirthdayYears = this.calculateBirthdayYears.bind(this);
        this.calculateBirthdayMonths = this.calculateBirthdayMonths.bind(this);
        this.calculateBirthdayDays = this.calculateBirthdayDays.bind(this);
    }

    onChange(event) {
        event.persist();
        this.setState({[event.target.name]: event.target.value}, () => {

            if (event.target.name === 'birthdayYear' || event.target.name === 'birthdayMonth') {
                this.setState({birthdayDayOptions: this.calculateBirthdayDays()});
            }
        });
    }

    componentDidMount() {
        const birthdayYearOptions = this.calculateBirthdayYears();
        const birthdayMonthOptions = this.calculateBirthdayMonths();

        this.setState({
            birthdayMonthOptions: birthdayMonthOptions,
            birthdayYearOptions: birthdayYearOptions,
            birthdayMonth: birthdayMonthOptions[0],
            birthdayYear: birthdayYearOptions[0],
        }, () => {
            const birthdayDayOptions = this.calculateBirthdayDays();
            this.setState({birthdayDayOptions: birthdayDayOptions, birthdayDay: birthdayDayOptions[0]});
        });

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
                        'custom:firstName': this.state.firstName,
                        'custom:lastName': this.state.lastName,
                        'custom:birthdayTimestamp': moment(
                            {
                                year: this.state.birthdayYear,
                                month: this.state.birthdayMonth,
                                day: this.state.birthdayDay,
                            }
                        ).valueOf().toString()
                    },
                }
            );
            console.log('This is my data: ', data);
        } catch (error) {
            this.setState({error: error});
        }
    }

    calculateBirthdayYears() {
        let birthdayYears = [];
        const now = moment();
        for (let year = now.year() - 18; year >= now.year() - 100; year--) {
            birthdayYears.push(year);
        }

        return birthdayYears;
    }

    calculateBirthdayMonths() {
        let birthdayMonths = [];

        for (let month = 1; month <= 12; month++) {
            birthdayMonths.push(month);
        }

        return birthdayMonths;
    }

    calculateBirthdayDays() {
        let birthdayDays = [];
        if (this.state.birthdayYear === '' || this.state.birthdayMonth === '') {
            return birthdayDays;
        }

        let daysInMonth = moment(
            {
                year: this.state.birthdayYear,
                month: parseInt(this.state.birthdayMonth) - 1,
            }
        ).daysInMonth();

        for (let day = 1; day <= daysInMonth; day++) {
            birthdayDays.push(day);
        }
        return birthdayDays;
    }

    render() {
        const birthdayYearsOptions = this.state.birthdayYearOptions.map(
            (year) => {
                return (
                    <option key={year} value={year}>{year}</option>
                )
            }
        );
        const birthdayMonthsOptions = this.state.birthdayMonthOptions.map(
            (month) => {
                return (
                    <option key={month} value={month}>{month}</option>
                )
            }
        );

        const birthdayDaysOptions = this.state.birthdayDayOptions.map(
            (day) => {
                return (
                    <option key={day} value={day}>{day}</option>
                )
            }
        );

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
                            <p className={'is-size-4 margin-top-3 margin-bottom-1'}>
                                Personal Information
                            </p>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label htmlFor={'firstName'}>
                                            First Name
                                        </label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type={'text'}
                                                id={'firstName'}
                                                name={'firstName'}
                                                value={this.state.firstName}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor={'lastName'}>
                                            Last Name
                                        </label>
                                        <div className="control">
                                            <input
                                                className="input"
                                                type={'text'}
                                                id={'lastName'}
                                                name={'lastName'}
                                                value={this.state.lastName}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className={'is-size-4 margin-top-3 margin-bottom-1'}>
                                Birthday Information
                            </p>
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <label htmlFor={'birthdayYear'}>
                                            Year
                                        </label>
                                        <div className="control">
                                            <div className="select">
                                                <select
                                                    id={'birthdayYear'}
                                                    name={'birthdayYear'}
                                                    value={this.state.birthdayYear}
                                                    onChange={this.onChange}
                                                >
                                                    {birthdayYearsOptions}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor={'birthdayMonth'}>
                                            Month
                                        </label>
                                        <div className="control">
                                            <div className="select">
                                                <select
                                                    id={'birthdayMonth'}
                                                    name={'birthdayMonth'}
                                                    value={this.state.birthdayMonth}
                                                    onChange={this.onChange}
                                                >
                                                    {birthdayMonthsOptions}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor={'birthdayDay'}>
                                            Day
                                        </label>
                                        <div className="control">
                                            <div className="select">
                                                <select
                                                    id={'birthdayDay'}
                                                    name={'birthdayDay'}
                                                    value={this.state.birthdayDay}
                                                    onChange={this.onChange}
                                                >
                                                    {birthdayDaysOptions}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className={'is-size-4 margin-top-3 margin-bottom-1'}>
                                Login Information
                            </p>
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
