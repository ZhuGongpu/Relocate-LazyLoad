import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute} from 'react-router'
import {getHooks} from "utils/hooks";

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (callback) => (componentModule) => {
    callback(null, componentModule.default);
};

// Demostrates two ways to do code spltting.
export default({history, store}) => {
    const {injectReducer} = getHooks(store);
    return <Router history={history}>
        <Route path="/" getComponent={(location, callback) => {
            const importModules = Promise.all([System.import ('containers/HomePage')]);
            const renderRoute = loadModule(callback);
            importModules.then(([component]) => {
                renderRoute(component)
            }).catch(errorLoading);
        }}/>
        <Route path="*" getComponent={(location, callback) => {
            require.ensure([], function(require) {
                callback(null, require('containers/NotFoundPage').default);
            }, "NotFoundPage");
        }}/>
    </Router>
};
