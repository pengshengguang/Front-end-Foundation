// 在原型模式中，this常用的有两种情况：
// ->情况一：在类中，this.xxx=xxx;this->当前类的实例
// ->情况二：某一个方法中的this->看执行的时候“.”前面是谁this就是谁
//       1)需要确定this的指向（this是谁
//       2)把this替换成对应的代码
//       3)按照原型链查找机制，一步步查找结果
function Fn() {
    this.x = 100;
    this.y = 200;
    this.getY = function () {
        console.log(this.y);
    }
}
Fn.prototype = {
    constructor: Fn,
    y: 300,
    getX: function () {
        console.log(this.x);
    },
    getY: function () {
        console.log(this.y);
    }
};
var f = new Fn;
f.getX(); // ->this是f ->console.log(f.x) ->100
f.__proto__.getX(); // ->this是f.__proto__ ->console.log(f.__proto__.x) ->undefined
// 上面的代码直接忽略私有的，直接查找公有的，但是公有里面没有x，所以报undefined
Fn.prototype.getX(); // ->undefined

f.getY(); // ->200
f.__proto__.getY(); // ->300




// 在内置类的原型上扩展我们的方法
// 数组去重（非常经典的一个算法）
Array.prototype.myUnique = function () {
    var obj = {};
    for (var i = 0; i < this.length; i++) {
        var cur = this[i];
        if (obj[cur] === cur) {
            this[i] = this[this.length-1];
            this.length--;
            i--;
            continue;
        }
        obj[cur] = cur;
    }
    obj = null;
    return this; // 目的：为了实现链式写法
};
var arr = [1,2,2,1];
arr.myUnique();
console.log(arr);

// 链式写法： 执行完成数组的一个方法可以紧接着执行下一个方法
// 原理：
// arr为什么可以使用sort方法？ ->因为sort是Array.prototype上的公有方法，而数组arr是Array这个类的一个实例，
//  所以arr可以使用sort方法 ->数组才能使用Array原型上定义的属性和方法
arr.sort(function(a, b) {
    return a - b;
}).reverse().pop();