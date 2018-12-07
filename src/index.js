import React from 'react';
import ReactDOM from 'react-dom';

import './index.sass';
import App from './App';

import 'bulma';

import initApplication from './applicationInit';

initApplication();

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
