import React, {Component} from 'react';

import {view} from 'react-easy-state';

import keysStore from "../stores/keysStore";
import Loading from "../base/Loading";
import CreateKeyModal from "./CreateKeyModal";


class NoKeys extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createKeyModalIsActive: false
        }
    }

    render() {
        return (
            <div>
                {keysStore.isLoading ? <Loading/> : (
                    <div>
                        <p>
                            You are currently having no keys!<br/>
                            You have to create one to sign contracts
                        </p>
                        <button
                            className="button is-primary"
                            onClick={() => {
                                this.setState({createKeyModalIsActive: true})
                            }}
                        >
                            Create one
                        </button>
                    </div>
                )}
                <CreateKeyModal
                    isActive={this.state.createKeyModalIsActive}
                    onClose={() => {
                        this.setState({createKeyModalIsActive: false})
                    }}
                />
            </div>
        );
    }
}

export default view(NoKeys);
