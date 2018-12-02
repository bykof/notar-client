import React from 'react';
import ReactDOM from 'react-dom';

import Amplify from 'aws-amplify';
import aws_config from './aws_config';

import './index.css';
import App from './App';

import 'bulma';

Amplify.configure(
    {
        Auth: {
            region: aws_config.cognito.REGION,
            userPoolId: aws_config.cognito.USER_POOL_ID,
            identityPoolId: aws_config.cognito.IDENTITY_POOL_ID,
            userPoolWebClientId: aws_config.cognito.APP_CLIENT_ID,
            mandatorySignIn: true,
        }
    }
);

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
