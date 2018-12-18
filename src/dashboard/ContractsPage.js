import React, {Component} from 'react';

import {view} from 'react-easy-state';

import CreateContractForm from "../contracts/CreateContractForm";
import contractStore from "../stores/contractsStore";
import Loading from "../base/Loading";


class ContractsPage extends Component {

    render() {

        const renderedContracts = contractStore.contracts.map(
            (contract) => <p key={contract.contractId}>{contract.contractId}</p>
        );

        return (
            <div>
                <div className="columns">
                    <div className="column">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-header-title">
                                    Create a new contract
                                </div>
                            </div>
                            <div className="card-content">
                                <CreateContractForm/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        {
                            contractStore.isLoading ? <Loading/> : (
                                contractStore.contracts.length === 0 ? (
                                    <p>No contracts created yet!</p>
                                ) : (
                                    renderedContracts
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default view(ContractsPage);
