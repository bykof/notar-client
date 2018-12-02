import React, {Component} from 'react';

import contract_image from '../static/images/contract.png';

class HomePage extends Component {
    render() {
        return (
            <div>
                <section className="hero is-medium is-dark is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                <img alt="Logo" src={contract_image} width="48px"/> Notar
                            </h1>
                            <p className="subtitle">
                                Sign contracts easy and secure!
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default HomePage;
