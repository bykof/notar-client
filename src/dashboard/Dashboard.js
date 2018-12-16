import React, {Component} from 'react';

import {view} from 'react-easy-state';

import NoKeys from "../keys/NoKeys";
import keysStore from "../stores/keysStore";


class Dashboard extends Component {

    render() {
        return (
            <div>
                {!keysStore.hasKeys ? <NoKeys /> : null}
            </div>
        );
    }
}

export default view(Dashboard);
