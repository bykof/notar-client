import React, {Component} from 'react';

class Loading extends Component {
    render() {
        return (
            <div className="columns">
                <div className="column has-text-centered">
                    <span className="icon">
                        <i className="fas fa-adjust fa-spin"/>
                    </span>
                </div>
            </div>
        );
    }
}

export default Loading;
