import React, {Component} from 'react';

import {view} from 'react-easy-state';

import CreateContractForm from "../contracts/CreateContractForm";
import contractStore from "../stores/contractsStore";
import Loading from "../base/Loading";
import Contract from "../contracts/Contract";


class ContractsPage extends Component {

    render() {
        const renderedContracts = contractStore.contracts.map(
            (contract) => (
                <div key={contract.contractId} className="column is-6">
                    <Contract contract={contract}/>
                </div>
            )
        );

        return (
            <div>
                <div className="columns">
                    <div className="column">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">
                                    Create a new contract
                                </p>
                            </header>
                            <div className="card-content">
                                <div className="content">
                                    <CreateContractForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns">
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
        );
    }
}

export default view(ContractsPage);
