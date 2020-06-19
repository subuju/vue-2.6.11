const vue2611 = require("./vue-2.6.11");

Vue.config



Vue.options = {
    _base: Vue,
    components: {
        KeepAlive: KeepAlive
    },
    directives: Object.create(null),
    filters: Object.create(null)
}



Vue.set = set;
Vue.delete = del;
Vue.nextTick = nextTick;


Vue.observable = function (obj) {
    observe(obj);
    return obj
};


