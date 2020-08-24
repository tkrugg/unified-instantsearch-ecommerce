import React, {render} from 'preact/compat';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './reset.scss';
import './theme.scss';
import './App.scss';

import defaultConfig from './config';
import rules from './config/rules';
import {App} from './App';
import {getDomElement, validateConfig} from './utils';


export function start(runtimeConfig) {
    const config = {...defaultConfig, ...runtimeConfig};
    validateConfig(config, rules);
    render(
        <Router>
            <Route path="*" component={(props) => <App {...props} config={config}/>}/>
        </Router>,
        getDomElement(config.inputContainer)
    );
}
