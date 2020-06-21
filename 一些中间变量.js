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