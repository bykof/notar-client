import React, {Component} from 'react';

import classNames from 'classnames';


class CardModal extends Component {
    render() {
        return (
            <div className={classNames('modal', {'is-active': this.props.isActive})}>
                <div className="modal-background" />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.props.title}</p>
                        <button onClick={this.props.onClose} className="delete" aria-label="close"/>
                    </header>
                    <section className="modal-card-body">
                        {this.props.children}
                    </section>
                    <footer className="modal-card-foot">
                        {this.props.foot}
                    </footer>
                </div>
            </div>
        );
    }
}

export default CardModal;
