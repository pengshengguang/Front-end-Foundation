// 原型继承
// 下面是例子，一个非常长的原型链继承
// #div1.__proto__ -> HTMLDivElement.prototype -> HTMLElement.prototype -> Element.prototype
// -> Node.prototype -> EventTarget.prototype -> Object.prototype

// 上面的原型链非常长，但是是如何将他们一级一级关联起来的呢？
// 实现原理如下
function myObject() {

}
myObject.prototype = {
    constructor: myObject,
    hasOwnProperty: function () {}
};
function myEventTraget() {
    
}
myEventTraget.prototype = new myObject(); // 子类的原型等于父类的实例
myEventTraget.prototype.constructor = myEventTraget;
myEventTraget.prototype.addEventListener = function () {};

function myNode() {

}
myNode.prototype = new myEventTraget(); // 子类的原型等于父类的实例
myNode.prototype.constructor = myNode;
myNode.prototype.createElment = function () {};
var n = new myNode; // 打印出来，看看n的结果，已经有四层__proto__了。

// 上面是多层继承，下面说下简单的继承，一样的，是上面的简化版
function A() {
    this.x = 100;
}
A.prototype.getX = function () {
    console.log(this.x)
};
function B() {
    this.y = 200;
}
// 现在，B想继承A的私有+公有的属性和方法
B.prototype = new A;
B.prototype.constructor = B;
var b = new B;
// “原型继承”是JS中最常见的一种继承方式
// 子类B想要继承父类A中所有属性和方法（私有+公有），只需要B.prototype = new A 即可
// 原型继承的特点：它是把父类中私有+公有的都继承到子类原型上（即子类公有的）

// 核心：原型继承并不是把父类中的属性和方法克隆一份一模一样的给B，而是让B和A之间增加原型链的连接，以后B的实例
//      b想要A中的getX方法，需要一级级的向上查找来使用

// 01:10:40 关键
// （面向对象）类的三个特征：继承、封装、多态
// 继承：子类继承父类的私有的属性和公有的方法
// 封装：把相同的代码写在一个函数当中
// 多态：
//    重载：JS严格意义没有重载，但是可以通过传递不同参数实现不同的功能
//    重写：子类重写父类的方法（这里只要把父类的原型一改，父类的其他实例会受到影响，又因为子类的原型继承父类的实例
//         这就会导致同样会影响到子类的实例，本质是因为在js原型继承当中，由于它的核心原理，继承并不是从父类中拿过
//         一份一模一样的东西拷贝过来，而是让子类和父类增加了一个原型链这样的一个桥梁）















