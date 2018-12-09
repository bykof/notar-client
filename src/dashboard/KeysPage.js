import React, {Component} from 'react';

import {view} from 'react-easy-state';

import keysStore from '../stores/keysStore';
import NoKeys from "../keys/NoKeys";
import Key from "../keys/Key";
import Loading from "../base/Loading";


class KeysPage extends Component {
    render() {
        return (
            <div className="columns">
                <div className="column">
                    {
                        keysStore.isLoading ? <Loading/> : (
                            !keysStore.hasKeys ? <NoKeys/> : (
                                <div>
                                    {
                                        keysStore.keys.map((key) => <Key key={key.id} keyObject={key}/>)
                                    }
                                    <div className="columns">
                                        <div className="column has-text-right">
                                            Forgot your PIN?<br/>
                                            <button className="button is-primary">Create new Key</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        );
    }
}

export default view(KeysPage);
