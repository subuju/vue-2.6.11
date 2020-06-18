var emptyObject = Object.freeze({});

var _toString = Object.prototype.toString;


var isBuiltInTag = function (val) {
    return map[val.toLowerCase()]; //map={slot: true, component: true}
}


var isReservedAttribute = function (val) {
    return map[val];//map={key: true, ref: true, slot: true, slot-scope: true, is: true}
}


var hasOwnProperty = Object.prototype.hasOwnProperty;

var camelizeRE = /-(\w)/g;



/**
 * 
 * fn=function (str) {
        return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
   }
 */
var cache = Object.create(null);
var camelize = function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
}


/**
 * fn=function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
   }
 */
var cache = Object.create(null);
var capitalize = function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
}




var hyphenateRE = /\B([A-Z])/g;

/**
 * function (str) {
        return str.replace(hyphenateRE, '-$1').toLowerCase()
   }
 */
var cache = Object.create(null);
var hyphenate = function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
}



var bind = function nativeBind(fn, ctx) {
    return fn.bind(ctx)
}


var no = function (a, b, c) { return false; };

var identity = function (_) { return _; };




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



var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));


var hasProto = '__proto__' in {};

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();

var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);


var nativeWatch = ({}).watch;

var supportsPassive = false;

var _isServer;

var isServerRendering = function () {
    if (_isServer === undefined) {
        /* istanbul ignore if */
        if (!inBrowser && !inWeex && typeof global !== 'undefined') {
            // detect presence of vue-server-renderer and avoid
            // Webpack shimming the process
            _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
        } else {
            _isServer = false;
        }
    }
    return _isServer
};


var hasSymbol = true

var _Set = Set;



var warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
        config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
        console.error(("[Vue warn]: " + msg + trace));
    }
};


var tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
        console.warn("[Vue tip]: " + msg + (
            vm ? generateComponentTrace(vm) : ''
        ));
    }
};


var generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
        var tree = [];
        var currentRecursiveSequence = 0;
        while (vm) {
            if (tree.length > 0) {
                var last = tree[tree.length - 1];
                if (last.constructor === vm.constructor) {
                    currentRecursiveSequence++;
                    vm = vm.$parent;
                    continue
                } else if (currentRecursiveSequence > 0) {
                    tree[tree.length - 1] = [last, currentRecursiveSequence];
                    currentRecursiveSequence = 0;
                }
            }
            tree.push(vm);
            vm = vm.$parent;
        }
        return '\n\nfound in\n\n' + tree
            .map(function (vm, i) {
                return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
                    ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
                    : formatComponentName(vm)));
            })
            .join('\n')
    } else {
        return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
};

var formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
        return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
        ? vm.options
        : vm._isVue
            ? vm.$options || vm.constructor.options
            : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
    }

    return (
        (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
        (file && includeFile !== false ? (" at " + file) : '')
    )
};


var repeat = function (str, n) {
    var res = '';
    while (n) {
        if (n % 2 === 1) { res += str; }
        if (n > 1) { str += str; }
        n >>= 1;
    }
    return res
};



var classifyRE = /(?:^|[-_])(\w)/g;

var classify = function (str) {
    return str
        .replace(classifyRE, function (c) { return c.toUpperCase(); })
        .replace(/[-_]/g, '');
};



var targetStack = [];





var VNode = function VNode(
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
};




var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
    return this.componentInstance
};




var createEmptyVNode = function (text) {
    if (text === void 0) text = '';

    var node = new VNode();
    node.text = text;
    node.isComment = true;
    return node
};



var arrayProto = Array.prototype;

var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];





var allowedGlobals = function (val) {
    return map[val]; //map = {Infinity:true, undefined:true, NaN:true, isFinite:true, isNaN：true,
    //  parseFloat:true, parseInt:true, decodeURI:true, decodeURIComponent:true, encodeURI:true, encodeURIComponent:true, 
    //  Math:true, Number:true, Date:true, Array：true, Object:true, Boolean:true, String:true, RegExp:true, Map:true, Set:true, JSON:true, Intl:true, require:true}
}



var isBuiltInModifier = function (val) {
    return map[val];//map={stop:true, prevent:true, self:true, ctrl:true, shift:true, alt:true, meta:true, exact:true};
}

