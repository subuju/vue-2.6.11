strats.el = strats.propsData = function (parent, child, vm, key) {
            if (!vm) {
                warn(
                    "option \"" + key + "\" can only be used during instance " +
                    'creation with the `new` keyword.'
                );
            }
            return defaultStrat(parent, child)
};


strats.data = function (parentVal, childVal, vm) {
    if (!vm) {
        if (childVal && typeof childVal !== 'function') {
            warn(
                'The "data" option should be a function ' +
                'that returns a per-instance value in component ' +
                'definitions.',
                vm
            );

            return parentVal
        }
        return mergeDataOrFn(parentVal, childVal)
    }
    return mergeDataOrFn(parentVal, childVal, vm)
};



strats[serverPrefetch] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};



strats[errorCaptured] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};


strats[deactivated] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};



strats[activated] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};


strats[beforeCreate] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};


strats[created] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};

strats[beforeMount] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};


strats[mounted] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};


strats[beforeUpdate] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};



strats[updated] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};

strats[beforeDestroy] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};


strats[destroyed] = function mergeHook(parentVal, childVal) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                : [childVal]
        : parentVal;
    return res
        ? dedupeHooks(res)
        : res
};


strats[components] = function mergeAssets(
    parentVal,
    childVal,
    vm,
    key
) {
    var res = Object.create(parentVal || null);
    if (childVal) {
        assertObjectType(key, childVal, vm);
        return extend(res, childVal)
    } else {
        return res
    }
};


strats[directives] = function mergeAssets(
    parentVal,
    childVal,
    vm,
    key
) {
    var res = Object.create(parentVal || null);
    if (childVal) {
        assertObjectType(key, childVal, vm);
        return extend(res, childVal)
    } else {
        return res
    }
};


strats[filters] = function mergeAssets(
    parentVal,
    childVal,
    vm,
    key
) {
    var res = Object.create(parentVal || null);
    if (childVal) {
        assertObjectType(key, childVal, vm);
        return extend(res, childVal)
    } else {
        return res
    }
};


strats.watch = function (
    parentVal,
    childVal,
    vm,
    key
) {
    // work around Firefox's Object.prototype.watch...
    if (parentVal === nativeWatch) { parentVal = undefined; }
    if (childVal === nativeWatch) { childVal = undefined; }
    /* istanbul ignore if */
    if (!childVal) { return Object.create(parentVal || null) }
    {
        assertObjectType(key, childVal, vm);
    }
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key$1 in childVal) {
        var parent = ret[key$1];
        var child = childVal[key$1];
        if (parent && !Array.isArray(parent)) {
            parent = [parent];
        }
        ret[key$1] = parent
            ? parent.concat(child)
            : Array.isArray(child) ? child : [child];
    }
    return ret
};



strats.props =
        strats.methods =
        strats.inject =
        strats.computed = function (
            parentVal,
            childVal,
            vm,
            key
        ) {
            if (childVal && "development" !== 'production') {
                assertObjectType(key, childVal, vm);
            }
            if (!parentVal) { return childVal }
            var ret = Object.create(null);
            extend(ret, parentVal);
            if (childVal) { extend(ret, childVal); }
            return ret
        };
    

strats.provide = function mergeDataOrFn(
        parentVal,
        childVal,
        vm
    ) {
        if (!vm) {
            // in a Vue.extend merge, both should be functions
            if (!childVal) {
                return parentVal
            }
            if (!parentVal) {
                return childVal
            }
            // when parentVal & childVal are both present,
            // we need to return a function that returns the
            // merged result of both functions... no need to
            // check if parentVal is a function here because
            // it has to be a function to pass previous merges.
            return function mergedDataFn() {
                return mergeData(
                    typeof childVal === 'function' ? childVal.call(this, this) : childVal,
                    typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
                )
            }
        } else {
            return function mergedInstanceDataFn() {
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
        }
    };