import React, {Component} from 'react';
import classNames from 'classnames';
import {view} from 'react-easy-state';

import {Storage} from 'aws-amplify';
import userStore from "../stores/userStore";


class Contract extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contractPDF: null,
        }
    }

    async componentDidMount() {
        let contractPDF = await Storage.get(this.props.contract.contractPdf);
        this.setState({contractPDF: contractPDF});
    }

    render() {
        return (
            <div className="box">
                <div className="columns">
                    <div className="column">
                        <embed src={this.state.contractPDF} type="application/pdf" width="100%" height="200px"/>
                    </div>
                </div>
                <div className="columns is-mobile">
                    {this.props.contract.users.map(
                        (user) => (
                            <div className="column is-6" key={user.username}>
                                {
                                    userStore.user.attributes && userStore.user.attributes.email === user.email ?
                                        (
                                            !user.signedAt ? (
                                                <button className="button is-primary">Sign</button>
                                            ) : (
                                                <span
                                                    className={
                                                        classNames("tag", 'is-success')
                                                    }
                                                >
                                                {user.email}
                                            </span>
                                            )
                                        ) : (
                                            <span
                                                className={
                                                    classNames("tag", {'is-danger': !user.hash, 'is-success': !!user.hash})
                                                }
                                            >
                                                {user.email}
                                            </span>
                                        )
                                }
                            </div>
                        )
                    )}

                </div>
            </div>
        );
    }
}

export default view(Contract);
