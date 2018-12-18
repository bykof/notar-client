import React, {Component} from 'react';

import {Storage} from 'aws-amplify';
import classNames from 'classnames';
import uuid from "uuid";
import contractStore from "../stores/contractsStore";
import Loading from "../base/Loading";

class CreateContractForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emails: [],
            emailInput: '',
            contractFiles: null,
            newContractUser: '',
            contractUsers: [],
            pin: '',
            isLoading: false,
        };

        this.fileChange = this.fileChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    fileChange(event) {
        this.setState({[event.target.name]: event.target.files});
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event) {
        event.preventDefault();
        this.setState({isLoading: true});

        const storage = await Storage.put(
            uuid.v1() + '.pdf', this.state.contractFiles[0],
            {
                contentType: 'application/pdf',
            },
        );

        try {
            const response = await contractStore.createContract(
                this.state.pin,
                storage.key,
                this.state.contractUsers,
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({isLoading: false});
            contractStore.updateContracts();
        }
    }

    addUser() {
        this.setState({contractUsers: this.state.contractUsers.concat([this.state.newContractUser])});
    }

    removeUser(contractUser) {
        this.setState(
            {
                contractUsers: this.state.contractUsers.filter(
                    (tempContractUser) => tempContractUser !== contractUser
                )
            }
        );
    }

    render() {
        const renderedContractUsers = this.state.contractUsers.map(
            (contractUser) => {
                return (
                    <span
                        className="tag is-primary is-medium"
                        style={{margin: 10}}
                        key={contractUser}
                    >
                        {contractUser}
                        <button className="delete" onClick={() => this.removeUser(contractUser)}/>
                    </span>
                );
            }
        );

        return (
            <form onSubmit={this.onSubmit}>
                <label className="label">
                    Who have to sign the contract?
                </label>
                <div className="field has-addons">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="newContractUser"
                            onChange={this.onChange}
                            placeholder="joe@example.com"
                        />
                    </div>
                    <div className="control">
                        <button type="button" className="button" onClick={this.addUser}>
                            <span className="icon">
                                <i className="fas fa-plus"/>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        {renderedContractUsers}
                    </div>
                </div>
                <label className="label">
                    Your current active Key Pin
                </label>
                <div className="field has-addons">
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name="pin"
                            onChange={this.onChange}
                            placeholder="123456"
                        />
                    </div>
                </div>
                <hr/>
                <div className="field">
                    <label className="label">
                        Upload the contract.pdf
                    </label>
                    <div className="file">
                        <label className="file-label">
                            <input
                                className="file-input"
                                type="file"
                                name="contractFiles"
                                accept='application/pdf'
                                onChange={this.fileChange}
                            />
                            <span className="file-cta">
                                <span className="file-icon">
                                    <i className="fas fa-upload"/>
                                </span>
                                <span className="file-label">
                                    Choose a file…
                                </span>
                            </span>
                            <span className={classNames('file-name', {'is-hidden': !this.state.contractFiles})}>
                                {this.state.contractFiles ? this.state.contractFiles[0].name : null}
                            </span>
                        </label>
                    </div>
                </div>
                <div className="columns">
                    <div className="column ">
                        <div className="field">
                            <div className="control">
                                <button type="submit" className="button is-primary is-pulled-right">
                                    {this.state.isLoading ? <Loading/> : "Sign"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default CreateContractForm;
