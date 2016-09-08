/**
 * Enable Lazy Loading of Component.
 *
 * Inject reducer async.
 *
 * Created by ZhuGongpu on 16/8/17.
 */

import React from "react";
import {getHooks} from "../../utils/hooks";
import getDisplayName from "../../utils/getClassDisplayName";

const lazyLoad = (domain, reducer) => ComposedComponent => {
    class LazyLoadingComponent extends React.Component {

        componentWillMount() {
            const {injectReducer} = getHooks(this.context.store);
            injectReducer(domain, reducer)
        }

        render() {
            return <ComposedComponent {...this.props}/>
        }
    }

    LazyLoadingComponent.displayName = `LazyLoad(${getDisplayName(ComposedComponent)})`;

    LazyLoadingComponent.contextTypes = {
        store: React.PropTypes.any
    };

    return LazyLoadingComponent;
};

export default lazyLoad;