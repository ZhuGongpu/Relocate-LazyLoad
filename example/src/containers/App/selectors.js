// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
    let prevRoutingState;
    let prevRoutingStateJS;

    return (state) => {
        // console.log("App/selectors: state: %o", state)
            // console.log("App/selectors: state.get: %o", state.get);
            // console.log("App/selectors: state.route: %o", state.route);
        // console.log("App/selectors: state.get('route'): %o", state.get("route"));
        const routingState = state.get('route');

        if (!routingState.equals(prevRoutingState)) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }

        // console.log("App/selectors: prevRoutingStateJS: %o", prevRoutingStateJS);

        return prevRoutingStateJS;
    };
};

export {
    selectLocationState,
};
