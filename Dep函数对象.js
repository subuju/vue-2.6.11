var uid = 0;

var Dep = function Dep() {
    this.id = uid++;
    this.subs = [];
};


Dep.target = undefined;