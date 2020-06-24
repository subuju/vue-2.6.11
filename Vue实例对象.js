_uid = 0,

    _isVue = true,


    $options = {
        components: {
            KeepAlive,
            Transition,
            TransitionGroup
        },

        directives: {
            model,
            show
        },

        filters: {

        },

        _base: {
            Vue,
        },

        el: '#app',

        //childVal:{message:"Hello Vue.js!"} parentVal=undefined
        data: function mergedInstanceDataFn() {
            // instance merge
            var instanceData = typeof childVal === 'function'
                ? childVal.call(vm, vm)
                : childVal;
            var defaultData = typeof parentVal === 'function'
                ? parentVal.call(vm, vm)
                : parentVal;
            if (instanceData) {
                return mergeData(instanceData, defaultData)
            } else {
                return defaultData
            }
        }
    },

    //handlers = hasHandler
    _renderProxy = new Proxy(vm, handlers),

    _self = vm,

    $parent = undefined;
$root = vm;

$children = [];
$refs = {};

_watcher = null;
_inactive = null;
_directInactive = false;
_isMounted = false;
_isDestroyed = false;
_isBeingDestroyed = false;

_events = Object.create(null);
_hasHookEvent = false;

_vnode = null; // the root of the child tree
_staticTrees = null; // v-once cached trees
$vnode = undefined,
    $slots = {

    },

    $scopedSlots = emptyObject,

    _c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); },
    $createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); },


    //var dep = new Dep();
    //getter = undefined;
    //setter = undefined;
    //childOb=false
    //shallow=true
    $attrs = {

    }


$listeners = {

}

_watchers = [],

    _data: getData(data, vm),

        message: sharedPropertyDefinition
