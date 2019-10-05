var num1 = 1; // 不是严格的实例，是一个基本值
var num2 = new Number(1); // 这是一个实例
// 上面这两种方式都是创建一个Number类的一个实例
// 但是，第一种方式并不是严格的实例，由于js是弱类型语言，对于基本数据类型，两种方式都可以，但是两者还是有本质区别的
num1 instanceof Number; // false
num2 instanceof Number; // true


Object.prototype.aaa = function () {};
var obj = {name: "psg",age: 22};
// for in 循环遍历的时候，默认的话可以把自己私有的和它在所属类原型上扩展的属性和方法都可以遍历到
// 但是一般情况下，我们遍历一个对象只需要遍历私有的即可，有以下两种方法
for (var key in obj) {
    console.log(key); // -> name, age, aaa
}
for (var key in obj) {
    // 遍历对象私有属性方法一
    //可枚举的 name, age
    //不可枚举的 aaa
    if (obj.propertyIsEnumerable(key)) {
        console.log(key); // -> name, age
    }
    // 遍历对象私有属性方法二
    // 是否私有属性
    if (obj.hasOwnProperty(key)){
        console.log(key); // -> name, age
    }
}

// ECMAScript5 新语法
// // -> Object.create(proObj) 创建一个新的对象，但是还要把proObj作为这个对象的原型
// // -> 在IE6~8不兼容
var obj = {
    getX: function () {}
};
var obj2 = Object.create(obj);
// ->obj
// __proto__:
//  getX: function() {}
//  __proto__: Object.prototype

// Object.create()的原理如下
function object(o) {
    function Fn() {}
    Fn.prototype=o;
    return new Fn;
}

// 总结 Object.create(proObj)
// 作用，实现原型对象的分层


