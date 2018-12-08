import React, {Component} from 'react';
import CardModal from "../base/CardModal";

import keysStore from '../stores/keysStore';
import Loading from "../base/Loading";


class CreateKeyModal extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            pin: '',
            isLoading: false,
        };

        this.state = this.defaultState;
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event) {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await keysStore.createKey(this.state.pin);
        } catch (error) {
            console.log(error);
        } finally {
            this.setState(this.defaultState);
            this.props.onClose();
        }

    }

    render() {

        const foot = (
            <button className="button is-primary" type="submit">
                {this.isLoading ? <Loading/> : "Create"}
            </button>
        );

        return (
            <form onSubmit={this.onSubmit}>
                <CardModal
                    onClose={this.props.onClose}
                    title={'Key Creator'}
                    isActive={this.props.isActive}
                    foot={foot}
                >
                    <div className="field">
                        <label className="label">Your PIN</label>
                        <div className="control">
                            <input
                                value={this.state.pin}
                                onChange={this.onChange}
                                name="pin"
                                className="input"
                                type="text"
                                placeholder="12345678"
                            />
                        </div>
                    </div>

                </CardModal>
            </form>
        );
    }
}

export default CreateKeyModal;
