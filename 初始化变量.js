var emptyObject = Object.freeze({});

var _toString = Object.prototype.toString;


var isBuiltInTag = function (val) {
    return map[val.toLowerCase()]; //map={slot: true, component: true}
}


var isReservedAttribute = function (val) {
    return map[val];//map={key: true, ref: true, slot: true, slot-scope: true, is: true}
}


var hasOwnProperty = Object.prototype.hasOwnProperty;





/**
 * 
 * fn=function (str) {
        return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
   }
 */
var camelize = function cachedFn(str) {
    var hit = cache[str];
    log(hit);
    return hit || (cache[str] = fn(str)); //fn=
}


/**
 * fn=function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
   }
 */
var capitalize = function cachedFn(str) {
    var hit = cache[str];
    log(hit);
    return hit || (cache[str] = fn(str))
}


/**
 * function (str) {
        return str.replace(hyphenateRE, '-$1').toLowerCase()
   }
 */
var hyphenate = function cachedFn(str) {
    var hit = cache[str];
    log(hit);
    return hit || (cache[str] = fn(str))
}



var bind = function nativeBind(fn, ctx) {
    return fn.bind(ctx)
}



var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
    'component',
    'directive',
    'filter'
];

var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
];


var config = ({
    /**
     * Option merge strategies (used in core/util/options)
     */
    // $flow-disable-line
    optionMergeStrategies: Object.create(null),

    /**
     * Whether to suppress warnings.
     */
    silent: false,

    /**
     * Show production mode tip message on boot?
     */
    productionTip: "development" !== 'production',

    /**
     * Whether to enable devtools
     */
    devtools: "development" !== 'production',

    /**
     * Whether to record perf
     */
    performance: false,

    /**
     * Error handler for watcher errors
     */
    errorHandler: null,

    /**
     * Warn handler for watcher warns
     */
    warnHandler: null,

    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],

    /**
     * Custom user key aliases for v-on
     */
    // $flow-disable-line
    keyCodes: Object.create(null),

    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,

    /**
     * Check if an attribute is reserved so that it cannot be used as a component
     * prop. This is platform-dependent and may be overwritten.
     */
    isReservedAttr: no,

    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,

    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,

    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,

    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,

    /**
     * Perform updates asynchronously. Intended to be used by Vue Test Utils
     * This will significantly reduce performance if set to false.
     */
    async: true,

    /**
     * Exposed for legacy reasons
     */
    _lifecycleHooks: LIFECYCLE_HOOKS
});