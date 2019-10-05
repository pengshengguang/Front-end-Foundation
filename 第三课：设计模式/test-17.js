function Fn() {
    this.x = 100;
}
Fn.prototype.getX = function() {};
Fn.prototype.getY = function() {};
Fn.prototype.getZ = function() {};
var f1 = new Fn();
// 上面代码，作用就是给原型扩展公有方法，这样看起来很繁琐，如何解决，看下面

// 批量给函数设置公有属性
// 两种方法
// 方法一、起别名
var pro = Fn.prototype;
pro.getA = function () {};
pro.getB = function () {};
// 但是本质还是没变

// 方法二、重构原型对象
function Fny() {
    this.x = 100;
}
Fny.prototype = {
    constructor: Fny,
    getX: function () {},
    getY: function () {},
    getZ: function () {}
};

// 1、只有浏览器天生给Fn.prototype开辟的堆内存里面才有constructor，而我们自己开辟的这个
// 堆内存没有这个属性，这样constructor指向就不在是Fn，而是Object了
// 为了和原来的保持一致，我们需要手动增加constructor的指向

// 2、用这种方法为内置类增加公有的属性
// 给内置类Array增加数组去重方法
Array.prototype.unique = function () {};// 这样写，如果该类原型中有该方法，这样写会覆盖原来的方法，如果没有，就会新增该方法

Array.prototype = {
    constructor: Array,
    unique: function () {}
}; // 注意，如果用这种方法来重构JS内置类的话，上面这段代码会自动被浏览器屏蔽掉，不会生效
// 我们这种方式把之前已经存在于原型上面的属性和方法给替换掉，所以我们中这种方式修改内置类的话，浏览器是给屏蔽掉的
// 但是如果是我们自己的建的类，是可以的直接覆盖原型的，不会被屏蔽

// 需要对内置类进行扩展，或者覆盖内置类上原型的方法，我们只能一个一个像下面这样写，不批量写
Array.prototype.unique = function() {};
// 这样写，会覆盖已有的方法，或者新增该方法。