/**
 * Inject reducer dynamically on loading
 *
 * Add `actionCreators` and `selectors` to props
 *
 * Created by ZhuGongpu on 16/8/17.
 */

import React from "react";
import lazyLoad from "../LazyLoad";
import getDisplayName from "../../utils/getClassDisplayName";

/**
 * @param makeActionCreators (domain) => action creators
 * @param makeReducer (actionPrefix) => reducer
 * @param makeSelectors (domain) => selectors
 */
const relocate = (makeActionCreators, makeReducer, makeSelectors) => ComposedComponent => {

    class RelocatableComponent extends React.Component {

        constructor(props) {
            super(props);
            let {domain, actionPrefix} = this.props;

            this.actionCreators = makeActionCreators(actionPrefix);
            this.selectors = makeSelectors(domain);
            this.reducer = makeReducer(this.actionCreators);

            this.LazyLoadingComponent = lazyLoad(domain, this.reducer)(ComposedComponent);
            RelocatableComponent.displayName = `Relocate(${getDisplayName(this.LazyLoadingComponent)})`;
        }

        render() {
            return <this.LazyLoadingComponent actionCreators={this.actionCreators}
                                              selectors={this.selectors}
                                              {...this.props}/>
        }
    }

    RelocatableComponent.propTypes = {
        domain: React.PropTypes.string.isRequired,
        actionPrefix: React.PropTypes.string.isRequired
    };

    RelocatableComponent.contextTypes = {
        store: React.PropTypes.any
    };

    return RelocatableComponent;
};

export default relocate;