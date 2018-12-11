import React, {Component} from 'react';
import CreateContractForm from "../contracts/CreateContractForm";


class ContractsPage extends Component {

    render() {
        return (
            <div className="columns">
                <div className="column">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-header-title">
                                Create a new contract
                            </div>
                        </div>
                        <div className="card-content">
                            <CreateContractForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContractsPage;
