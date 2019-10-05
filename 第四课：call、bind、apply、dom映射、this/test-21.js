// 函数的三种角色
// 这一节超级屌！

function Fn() {
    this.x = 100;
}
Fn.prototype.getX = function () {
    console.log(this.x);
};
var f = new Fn;
console.log(f instanceof Fn); //->true
console.log(f instanceof Object); //->true  f不仅仅是Fn的一个实例，还是Object的一个实例

// 1.所有函数都是Function这个类的一个实例
// 2.导致所有的函数都是实例，所有实例都是是对象数据类型，那么所有的对象数据类型就有__proto__这个属性的存在
// 3.所有的函数本身就是对象（18分）【根据W3C上面的解释，JS中所有事物都是对象，对象是拥有属性和方法的数据https://www.cnblogs.com/yuanzhiguo/p/8109540.html】

// 函数本身也会有自己的一些属性：
// ->length: 0  形参的个数
// ->name: "Fn" 函数名
// ->prototype: 类的原型，在原型上定义的方法都是当前Fn这个类实例的公有方法
// ->__proto__: 把哈数当做一个普通的对象，指向Function这个类的原型（注意，Function这个类的__proto__指向的是自己的原型）

// 总结
// 函数在整个JS中是最复杂也是最重要的知识：
// 1、一个函数存在多面性：
// ->它本身是一个函数，执行的时候形成私有作用域（闭包），形参赋值，预解释，代码执行，执行完后栈内存销毁/不销毁
// ->"类": 它有自己的实例，也有一个叫做prototype属性是自己的原型，它的实例都可以指向自己的原型
// ->“普通对象”: 和var obj = {}中的obj一样，就是一个普通的对象，它作为对象可以有自己的私有属性，也可以通过
//    __proto__找到Function.prototype

// 这三种角色是没有冲突的，看下面的例子
function Fn1() { // 这时候，Fn就是一个普通函数，形参赋值，预解释，代码执行
    var num = 500
    this.x = 100;
}
Fn.prototype.getX = function () {
    console.log(this.x);
};
Fn.aaa = 1000; // 这时候，Fn就是作为一个对象（有私有属性，有方法，还有原型）
var f = new Fn; // 这时候，Fn就是一个类，可以通过new创建对象 ，this指向的是f！！

console.log(f.num); //->undefined   这个时候，Fn就是一个类，num是Fn作为普通函数才有用，num跟类完全没关系
console.log(f.aaa); //->undefined   这个时候，Fn就是一个类，aaa是Fn作为对象才有用，aaa跟类完全没有关系

var res = Fn();
console.log(res); //->undefined   这个时候，Fn就是一个普通函数，函数里没返回值，this指向的是window！！！！！靠！！！

// 靠，牛逼！！上面的例子完美的解释了，函数三种角色真的没有任何联系。
// 感觉函数真的是模拟了真实人生，就好比我带着我爸妈，带着我闺女，我作为人类、作为父亲、作为儿子，没有任何冲突，该干嘛干嘛！！


// 有个非常坑爹的，Function.prototype 这个不是对象，是函数数据类型
// 但是操作和对象一模一样

// dir(Function.prototype)   -> 叫做anonymous，匿名函数，没有实际意义的一个函数，操作起来跟对象一米一样

