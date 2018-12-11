import React, {Component} from 'react';

import classNames from 'classnames';
import uuid from "uuid";

class CreateContractForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emails: [],
            emailInput: '',
            contractFiles: null,
            newContractUser: '',
            contractUsers: [],
        };

        this.fileChange = this.fileChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    fileChange(event) {
        console.log(event.target.files);
        this.setState({[event.target.name]: event.target.files});
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event) {
        event.preventDefault();
        for (const file of this.state.contractFiles) {
            await Storage.put(
                uuid.v1() + '.pdf', file,
                {
                    contentType: 'application/pdf',
                },
            );
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
        console.log(this.state.contractUsers);
        const renderedContractUsers = this.state.contractUsers.map(
            (contractUser) => {
                return (
                    <span
                        key={contractUser}
                        className="tag is-primary is-medium"
                    >
                        {contractUser}
                        <button className="delete" onClick={() => this.removeUser(contractUser)} />
                    </span>
                );
            }
        );

        return (
            <form onSubmit={this.onSubmit}>
                <label className="label">
                    Who has to sign the contract?
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
            </form>
        );
    }
}

export default CreateContractForm;
