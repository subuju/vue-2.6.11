
component
res.__proto__ = {
    KeepAlive: {}, 
    Transition: {},
    TransitionGroup: {}
}



directives
res.__proto__={
    model:{},
    show:{}
}


filters
res.__proto__={

}


_base



options = {
    component:res,
    directives:res,
    filters:res,
    _base:function Vue,
    el:'#app',
    data:function mergedInstanceDataFn() {
        log('enter mergedInstanceDataFn()');
        // instance merge
        var instanceData = typeof childVal === 'function'
            ? childVal.call(vm, vm)
            : childVal;

        log(instanceData);

        var defaultData = typeof parentVal === 'function'
            ? parentVal.call(vm, vm)
            : parentVal;

        log(defaultData);

        if (instanceData) {
            return mergeData(instanceData, defaultData)
        } else {
            return defaultData
        }
        log('exit mergedInstanceDataFn()');
    }
}



targetStack = [
    undefined,
]


defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
    !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
}, true);


defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
    !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
}, true);



{
    message: "Hello Vue.js!",
        __ob__: {
        value: val,
            enumerable: !!enumerable,
                writable: true,
                    configurable: true
    }
}