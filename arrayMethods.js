function mutator() {
    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
        case 'push':
        case 'unshift':
            inserted = args;
            break
        case 'splice':
            inserted = args.slice(2);
            break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
}




arrayMethods = {
    push: {
        value: mutator,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    },

    pop: {
        value: mutator,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    },

    shift: {
        value: mutator,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    },

    unshift: {
        value: mutator,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    },

    splice: {
        value: mutator,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    },

    sort: {
        value: mutator,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    },

    reverse: {
        value: mutator,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    },
}