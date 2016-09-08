/**
 * Create the store with asynchronously loaded reducers
 */
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import {fromJS} from 'immutable';
import {routerMiddleware} from 'react-router-redux';
import createReducer from './reducers';

const devtools = window.devToolsExtension || (() => noop => noop);

export default function configStore(initialState = {}, history) {
    const middlewares = [thunk, createLogger(), routerMiddleware(history)];
    const enhancers = [
        applyMiddleware(...middlewares),
        devtools()
    ];
    const store = createStore(createReducer({}), fromJS(initialState), compose(...enhancers));

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        System.import ('./reducers').then((reducerModule) => {
            const createReducers = reducerModule.default;
            const nextReducers = createReducers(store.asyncReducers);

            // console.log("store: store: %o nextReducers: %o", store, nextReducers);

            store.replaceReducer(nextReducers);
        });
    }
    // Initialize it with no other reducers
    store.asyncReducers = {};
    // console.info("configStore: created: store=%O, store.getState()=%o", store, store.getState());
    return store;
}
