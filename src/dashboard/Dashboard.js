import React, {Component} from 'react';

import {view} from 'react-easy-state';

import NoKeys from "../keys/NoKeys";
import keysStore from "../stores/keysStore";
import contractStore from "../stores/contractsStore";


class Dashboard extends Component {

    render() {

        const keysSum = (
            <div className={"card"}>
                <div className={"card-body"}>
                    <div className={"columns"}>
                        <div className={"column"}>
                            <div className="level">
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Keys created</p>
                                        <p className="title">
                                            {keysStore.keys.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        const contractsSum = (
            <div className={"card"}>
                <div className={"card-body"}>
                    <div className={"columns"}>
                        <div className={"column"}>
                            <div className="level">
                                <div className="level-item has-text-centered">
                                    <div>
                                        <p className="heading">Contract created</p>
                                        <p className="title">
                                            {contractStore.contracts.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className={"columns is-multiline is-mobile"}>
                {!keysStore.hasKeys ? <NoKeys/> : <div className={"column is-6"}>{keysSum}</div>}
                <div className={"column is-6"}>{contractsSum}</div>
            </div>
        );
    }
}

export default view(Dashboard);
