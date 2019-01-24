import React, {Component} from 'react';

import contractStore from "../stores/contractsStore";
import Loading from "../base/Loading";
import CardModal from "../base/CardModal";

class SignContractForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pin: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    async onSubmit(event) {
        event.preventDefault();
        this.setState({isLoading: true});

        try {
            const response = await contractStore.signContract(
                this.props.contractId,
                this.state.pin,
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            this.setState({isLoading: false});
            contractStore.updateContracts();
        }
    }

    render() {
        const foot = (
            <button className="button is-primary" type="submit">
                {this.isLoading ? <Loading/> : "Sign"}
            </button>
        );

        return (
            <form onSubmit={this.onSubmit}>
                <CardModal
                    onClose={this.props.onClose}
                    title={'Sign a contract'}
                    isActive={this.props.isActive}
                    foot={foot}
                >
                    <label className="label">
                        Your current active Key Pin
                    </label>
                    <div className="field has-addons">
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="pin"
                                onChange={this.onChange}
                                placeholder="123456"
                            />
                        </div>
                    </div>
                </CardModal>
            </form>
        );
    }
}

export default SignContractForm;
