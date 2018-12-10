import React, {Component} from 'react';
import {Storage} from 'aws-amplify';
import uuid from 'uuid';


class ContractsPage extends Component {

    async onChange(e) {
        const file = e.target.files[0];
        await Storage.put(
            uuid.v1() + '.pdf', file,
            {
                contentType: 'application/pdf',
            },
        );
    }

    render() {
        return (
            <div className="file">
                <label className="file-label">
                    <input
                        className="file-input"
                        type="file"
                        accept='application/pdf'
                        onChange={(e) => this.onChange(e)}
                    />
                    <span className="file-cta">
                        <span className="file-icon">
                            <i className="fas fa-upload"/>
                        </span>
                        <span className="file-label">
                            Choose a file…
                        </span>
                    </span>
                </label>
            </div>
        );
    }
}

export default ContractsPage;
