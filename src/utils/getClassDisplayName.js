/**
 * Created by ZhuGongpu on 16/8/17.
 */
export default function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}