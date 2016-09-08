import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from "react-router-redux";
import {browserHistory} from 'react-router'
import {selectLocationState} from "containers/App/selectors";
import configureStore from "../../store";
import Routes from "../../routes";

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// console.log("App/index: store: %o, state: %o", store, store.getState());

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the status
const history = syncHistoryWithStore(browserHistory, store, {selectLocationState: selectLocationState()});

// Demostrates two ways to do code spltting.
// Note: System.import requires webpack@>=2.0.0
export default() => <Provider store={store}>
    <Routes history={history} store={store}/>
</Provider>;
