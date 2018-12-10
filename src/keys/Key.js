import React, {Component} from 'react';

import {view} from 'react-easy-state';

import moment from 'moment';
import {DEFAULT_DATE_FORMAT} from "../constants";


class Key extends Component {
    render() {
        return (
            <div className="box">
                <div className="columns is-mobile">
                    <div className="column">
                        Created: {moment(this.props.keyObject.created).format(DEFAULT_DATE_FORMAT)}
                    </div>
                    <div className="column">
                        Active: {this.props.keyObject.active ? 'Yes' : 'No'}
                    </div>
                </div>
                <div className="columns">
                    <div className="column">
                        <p className="is-size-7-mobile">Hash: {this.props.keyObject.hash}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default view(Key);
