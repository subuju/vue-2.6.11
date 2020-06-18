Vue.prototype._init = function (options) {
    log('enter _init(options)');
    log(this);
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;

    log(config.performance);

    /* istanbul ignore if */
    if (config.performance && mark) {
        startTag = "vue-perf-start:" + (vm._uid);
        endTag = "vue-perf-end:" + (vm._uid);
        mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;

    log(options);
    log(options._isComponent);

    // merge options
    if (options && options._isComponent) {
        log('if (options && options._isComponent)');
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options);
    } else {
        log('else');
        vm.$options = mergeOptions(
            resolveConstructorOptions(vm.constructor),
            options || {},
            vm
        );
    }
    /* istanbul ignore else */
    {
        initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag);
        measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
        vm.$mount(vm.$options.el);
    }
};


Vue.prototype.$set=function set(target, key, val) {
    if (isUndef(target) || isPrimitive(target)
    ) {
        warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val
    }
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
        warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
            'at runtime - declare it upfront in the data option.'
        );
        return val
    }
    if (!ob) {
        target[key] = val;
        return val
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val
}


Vue.prototype.$del = function del(target, key) {
    if (isUndef(target) || isPrimitive(target)
    ) {
        warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
    }
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.splice(key, 1);
        return
    }
    var ob = (target).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
        warn(
            'Avoid deleting properties on a Vue instance or its root $data ' +
            '- just set it to null.'
        );
        return
    }
    if (!hasOwn(target, key)) {
        return
    }
    delete target[key];
    if (!ob) {
        return
    }
    ob.dep.notify();
}



Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject(cb)) {
        return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
        try {
            cb.call(vm, watcher.value);
        } catch (error) {
            handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
        }
    }
    return function unwatchFn() {
        watcher.teardown();
    }
};


Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
            vm.$on(event[i], fn);
        }
    } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
            vm._hasHookEvent = true;
        }
    }
    return vm
};

Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on() {
        vm.$off(event, on);
        fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
};

Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
        vm._events = Object.create(null);
        return vm
    }
    // array of events
    if (Array.isArray(event)) {
        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
            vm.$off(event[i$1], fn);
        }
        return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
        return vm
    }
    if (!fn) {
        vm._events[event] = null;
        return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1);
            break
        }
    }
    return vm
};

Vue.prototype.$emit = function (event) {
    var vm = this;
    {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
            tip(
                "Event \"" + lowerCaseEvent + "\" is emitted in component " +
                (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
                "Note that HTML attributes are case-insensitive and you cannot use " +
                "v-on to listen to camelCase events when using in-DOM templates. " +
                "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
            );
        }
    }
    var cbs = vm._events[event];
    if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        var info = "event handler for \"" + event + "\"";
        for (var i = 0, l = cbs.length; i < l; i++) {
            invokeWithErrorHandling(cbs[i], vm, args, vm, info);
        }
    }
    return vm
};



Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
        prevEl.__vue__ = null;
    }
    if (vm.$el) {
        vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
};

Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
        vm._watcher.update();
    }
};

Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
        return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
        vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
        vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
        vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
        vm.$vnode.parent = null;
    }
};


Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
};

Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
        vm.$scopedSlots = normalizeScopedSlots(
            _parentVnode.data.scopedSlots,
            vm.$slots,
            vm.$scopedSlots
        );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
        // There's no need to maintain a stack because all render fns are called
        // separately from one another. Nested component's render fns are called
        // when parent component is patched.
        currentRenderingInstance = vm;
        vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
        handleError(e, vm, "render");
        // return error render result,
        // or previous vnode to prevent render error causing blank component
        /* istanbul ignore else */
        if (vm.$options.renderError) {
            try {
                vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
            } catch (e) {
                handleError(e, vm, "renderError");
                vnode = vm._vnode;
            }
        } else {
            vnode = vm._vnode;
        }
    } finally {
        currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
        vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
        if (Array.isArray(vnode)) {
            warn(
                'Multiple root nodes returned from render function. Render function ' +
                'should return a single root node.',
                vm
            );
        }
        vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
};


Vue.prototype._o = markOnce;
Vue.prototype._n = toNumber;
Vue.prototype._s = toString;
Vue.prototype._l = renderList;
Vue.prototype._t = renderSlot;
Vue.prototype._q = looseEqual;
Vue.prototype._i = looseIndexOf;
Vue.prototype._m = renderStatic;
Vue.prototype._f = resolveFilter;
Vue.prototype._k = checkKeyCodes;
Vue.prototype._b = bindObjectProps;
Vue.prototype._v = createTextVNode;
Vue.prototype._e = createEmptyVNode;
Vue.prototype._u = resolveScopedSlots;
Vue.prototype._g = bindObjectListeners;
Vue.prototype._d = bindDynamicKeys;
Vue.prototype._p = prependModifier;