import React, {Component} from 'react';

import {view} from 'react-easy-state';

import keysStore from '../stores/keysStore';
import NoKeys from "../keys/NoKeys";
import Key from "../keys/Key";
import Loading from "../base/Loading";
import CreateKeyModal from "../keys/CreateKeyModal";


class KeysPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            createKeyModalIsActive: false,
        };
    }

    render() {
        return (
            <div className="columns">
                <div className="column">
                    {
                        keysStore.isLoading ? <Loading/> : (
                            !keysStore.hasKeys ? <NoKeys/> : (
                                <div>
                                    {
                                        keysStore.keys.map((key) => <Key key={key.keyId} keyObject={key}/>)
                                    }
                                    <div className="columns">
                                        <div className="column has-text-right">
                                            Forgot your PIN?<br/>
                                            <button
                                                className="button is-primary"
                                                onClick={() => {
                                                    this.setState({createKeyModalIsActive: true})
                                                }}
                                            >
                                                Create new Key
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
                <CreateKeyModal
                    onClose={() => {
                        this.setState({createKeyModalIsActive: false})
                    }}
                    isActive={this.state.createKeyModalIsActive}
                />
            </div>
        );
    }
}

export default view(KeysPage);
